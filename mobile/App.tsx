import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { BUNDLED_SCHEDULE } from './src/data/bundledSchedule';
import {
  childAgeLabel,
  isOlderChildForBackfill,
  nextMilestoneStatus,
  validateProfileDraft,
  type ChildProfileDraft,
  type ChildSex,
  type ProfileValidationError,
} from './src/domain/profile';
import type { LanguageCode } from './src/domain/schedule';
import {
  antigenNamesById,
  doseLabel,
  scheduleCounts,
  timelineMilestones,
  type TimelineMilestone,
} from './src/domain/timeline';
import { DEFAULT_LANGUAGE, t, type StringKey } from './src/i18n/strings';
import {
  acceptDisclaimer,
  createChildProfile,
  deleteChildProfile,
  getDatabaseSnapshot,
  initializeTrackerDatabase,
  readTrackerDatabaseState,
  saveSetting,
  setActiveChildProfile,
  updateChildProfile,
  type ChildProfile,
  type TrackerDatabaseState,
} from './src/storage/database';
import { ErrorBoundary } from './src/ui/ErrorBoundary';
import { logAppHealth } from './src/utils/healthLog';

export default function App() {
  return (
    <ErrorBoundary>
      <TrackerApp />
      <StatusBar style="dark" />
    </ErrorBoundary>
  );
}

type TabKey = 'today' | 'timeline' | 'record' | 'profile';

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; tracker: TrackerDatabaseState };

const TABS: { key: TabKey; labelKey: StringKey }[] = [
  { key: 'today', labelKey: 'today' },
  { key: 'timeline', labelKey: 'timeline' },
  { key: 'record', labelKey: 'record' },
  { key: 'profile', labelKey: 'profile' },
];

function TrackerApp() {
  const [language, setLanguageState] = useState<LanguageCode>(DEFAULT_LANGUAGE);
  const [activeTab, setActiveTab] = useState<TabKey>('today');
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' });

  const counts = useMemo(() => scheduleCounts(BUNDLED_SCHEDULE), []);
  const timeline = useMemo(() => timelineMilestones(BUNDLED_SCHEDULE), []);
  const antigensById = useMemo(
    () => antigenNamesById(BUNDLED_SCHEDULE, language),
    [language],
  );

  const applyTrackerState = useCallback((tracker: TrackerDatabaseState) => {
    setLanguageState(tracker.snapshot.language);
    setLoadState({ status: 'ready', tracker });
  }, []);

  const refreshTracker = useCallback(
    async (tracker: TrackerDatabaseState) => {
      const nextTracker = await readTrackerDatabaseState(
        tracker.db,
        tracker.importResult,
      );
      applyTrackerState(nextTracker);
    },
    [applyTrackerState],
  );

  const loadDatabase = useCallback(async () => {
    setLoadState({ status: 'loading' });
    logAppHealth('app_boot');
    try {
      const tracker = await initializeTrackerDatabase();
      applyTrackerState(tracker);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unknown database error';
      logAppHealth('database_error', message);
      setLoadState({ status: 'error', message });
    }
  }, [applyTrackerState]);

  useEffect(() => {
    void loadDatabase();
  }, [loadDatabase]);

  const setLanguage = useCallback(
    async (nextLanguage: LanguageCode) => {
      setLanguageState(nextLanguage);
      if (loadState.status !== 'ready') {
        return;
      }

      await saveSetting(loadState.tracker.db, 'language', nextLanguage);
      const snapshot = await getDatabaseSnapshot(loadState.tracker.db);
      setLoadState({
        status: 'ready',
        tracker: { ...loadState.tracker, snapshot },
      });
    },
    [loadState],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.appShell}>
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <Text style={styles.title}>{t(language, 'appTitle')}</Text>
            <Text style={styles.subtitle}>{t(language, 'appSubtitle')}</Text>
          </View>
          <LanguageSwitch language={language} onChange={setLanguage} />
        </View>

        <View style={styles.tabBar} accessibilityRole="tablist">
          {TABS.map((tab) => (
            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: activeTab === tab.key }}
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.key && styles.tabTextActive,
                ]}
              >
                {t(language, tab.labelKey)}
              </Text>
            </Pressable>
          ))}
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {loadState.status === 'loading' ? (
            <LoadingState language={language} />
          ) : loadState.status === 'error' ? (
            <ErrorState
              language={language}
              message={loadState.message}
              onRetry={loadDatabase}
            />
          ) : (
            <ReadyScreen
              activeTab={activeTab}
              antigensById={antigensById}
              counts={counts}
              language={language}
              loadState={loadState}
              onSetTab={setActiveTab}
              onTrackerChanged={refreshTracker}
              timeline={timeline}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

interface ReadyScreenProps {
  activeTab: TabKey;
  antigensById: Record<string, string>;
  counts: ReturnType<typeof scheduleCounts>;
  language: LanguageCode;
  loadState: Extract<LoadState, { status: 'ready' }>;
  onSetTab: (tab: TabKey) => void;
  onTrackerChanged: (tracker: TrackerDatabaseState) => Promise<void>;
  timeline: TimelineMilestone[];
}

function ReadyScreen({
  activeTab,
  antigensById,
  counts,
  language,
  loadState,
  onSetTab,
  onTrackerChanged,
  timeline,
}: ReadyScreenProps) {
  if (activeTab === 'timeline') {
    return (
      <TimelineScreen
        antigensById={antigensById}
        language={language}
        timeline={timeline}
      />
    );
  }
  if (activeTab === 'record') {
    return <RecordScreen language={language} loadState={loadState} />;
  }
  if (activeTab === 'profile') {
    return (
      <ProfileScreen
        counts={counts}
        language={language}
        loadState={loadState}
        onTrackerChanged={onTrackerChanged}
      />
    );
  }
  return (
    <TodayScreen
      counts={counts}
      language={language}
      loadState={loadState}
      onSetTab={onSetTab}
      onTrackerChanged={onTrackerChanged}
    />
  );
}

function TodayScreen({
  counts,
  language,
  loadState,
  onSetTab,
  onTrackerChanged,
}: Pick<
  ReadyScreenProps,
  'counts' | 'language' | 'loadState' | 'onSetTab' | 'onTrackerChanged'
>) {
  const profile = loadState.tracker.activeChildProfile;
  if (!profile || !loadState.tracker.disclaimerAcceptance.accepted) {
    return (
      <OnboardingScreen
        language={language}
        loadState={loadState}
        onComplete={async () => {
          await onTrackerChanged(loadState.tracker);
          onSetTab('today');
        }}
      />
    );
  }

  const nextStatus = nextMilestoneStatus(profile, BUNDLED_SCHEDULE, language);

  return (
    <View style={styles.screen}>
      <InfoPanel accent="green">
        <Text style={styles.panelKicker}>{t(language, 'localReady')}</Text>
        <Text style={styles.panelTitle}>{profileLabel(profile, language)}</Text>
        <Text style={styles.panelBody}>
          {t(language, 'childAge')}:{' '}
          {childAgeLabel(profile.birthDate, language)}
        </Text>
      </InfoPanel>

      <InfoPanel accent="blue">
        <Text style={styles.panelKicker}>{t(language, 'nextDue')}</Text>
        {nextStatus ? (
          <>
            <Text style={styles.panelTitle}>
              {nextStatus.ageLabel} · {nextStatus.dueDate}
            </Text>
            <Text style={styles.panelBody}>
              {t(language, 'mandatory')}: {nextStatus.mandatoryCount} ·{' '}
              {t(language, 'recommended')}: {nextStatus.recommendedCount}
            </Text>
          </>
        ) : (
          <Text style={styles.panelBody}>
            {t(language, 'noUpcomingMilestone')}
          </Text>
        )}
      </InfoPanel>

      {profile.incompleteHistory ? (
        <InfoPanel accent="amber">
          <Text style={styles.panelKicker}>
            {t(language, 'incompleteHistory')}
          </Text>
          <Text style={styles.panelBody}>
            {t(language, 'backfillLaterBody')}
          </Text>
        </InfoPanel>
      ) : null}

      <View style={styles.metricsGrid}>
        <Metric
          label={t(language, 'mandatory')}
          value={counts.mandatoryDoses}
        />
        <Metric
          label={t(language, 'recommended')}
          value={counts.recommendedDoses}
        />
        <Metric label={t(language, 'products')} value={counts.products} />
        <Metric label={t(language, 'sources')} value={counts.sources} />
      </View>

      <InfoPanel accent="amber">
        <Text style={styles.panelKicker}>
          {importStatusText(language, loadState.tracker.importResult.status)}
        </Text>
        <Text style={styles.panelTitle}>
          {loadState.tracker.snapshot.scheduleVersion}
        </Text>
        <Text style={styles.panelBody}>{t(language, 'disclaimer')}</Text>
      </InfoPanel>
    </View>
  );
}

function TimelineScreen({
  antigensById,
  language,
  timeline,
}: Pick<ReadyScreenProps, 'antigensById' | 'language' | 'timeline'>) {
  return (
    <View style={styles.screen}>
      {timeline.slice(0, 10).map((item) => (
        <View key={item.milestone.id} style={styles.timelineItem}>
          <Text style={styles.timelineMilestone}>
            {t(language, 'milestone')}: {item.milestone.label[language]}
          </Text>
          {item.mandatory.length > 0 ? (
            <DoseLine
              doses={item.mandatory}
              label={t(language, 'mandatory')}
              names={antigensById}
              tone="mandatory"
            />
          ) : null}
          {item.recommended.length > 0 ? (
            <DoseLine
              doses={item.recommended}
              label={t(language, 'recommended')}
              names={antigensById}
              tone="recommended"
            />
          ) : null}
        </View>
      ))}
    </View>
  );
}

function RecordScreen({
  language,
  loadState,
}: Pick<ReadyScreenProps, 'language' | 'loadState'>) {
  return (
    <View style={styles.screen}>
      <InfoPanel accent="rose">
        <Text style={styles.panelKicker}>{t(language, 'record')}</Text>
        <Text style={styles.panelTitle}>{t(language, 'noRecordsTitle')}</Text>
        <Text style={styles.panelBody}>{t(language, 'noRecordsBody')}</Text>
      </InfoPanel>
      <View style={styles.metricsGrid}>
        <Metric
          label={t(language, 'record')}
          value={loadState.tracker.snapshot.administrationEvents}
        />
        <Metric
          label={t(language, 'reminders')}
          value={loadState.tracker.snapshot.reminders}
        />
      </View>
    </View>
  );
}

function ProfileScreen({
  counts,
  language,
  loadState,
  onTrackerChanged,
}: Pick<
  ReadyScreenProps,
  'counts' | 'language' | 'loadState' | 'onTrackerChanged'
>) {
  const snapshot = loadState.tracker.snapshot;
  const [mode, setMode] = useState<'view' | 'add' | 'edit'>('view');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const activeProfile = loadState.tracker.activeChildProfile;

  const selectProfile = async (profileId: string) => {
    await setActiveChildProfile(loadState.tracker.db, profileId);
    await onTrackerChanged(loadState.tracker);
    setMode('view');
    setConfirmDelete(false);
  };

  const deleteActiveProfile = async () => {
    if (!activeProfile) {
      return;
    }
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    await deleteChildProfile(loadState.tracker.db, activeProfile.id);
    await onTrackerChanged(loadState.tracker);
    setMode('view');
    setConfirmDelete(false);
  };

  if (mode === 'add' || (mode === 'edit' && activeProfile)) {
    return (
      <ProfileForm
        initialProfile={
          mode === 'edit' && activeProfile ? activeProfile : undefined
        }
        language={language}
        onCancel={() => {
          setMode('view');
          setConfirmDelete(false);
        }}
        onSubmit={async (draft) => {
          if (mode === 'edit' && activeProfile) {
            await updateChildProfile(
              loadState.tracker.db,
              activeProfile.id,
              draft,
            );
          } else {
            await createChildProfile(loadState.tracker.db, draft);
          }
          await onTrackerChanged(loadState.tracker);
          setMode('view');
          setConfirmDelete(false);
        }}
        submitLabel={t(
          language,
          mode === 'edit' ? 'saveProfile' : 'createProfile',
        )}
      />
    );
  }

  return (
    <View style={styles.screen}>
      {activeProfile ? (
        <InfoPanel accent="green">
          <Text style={styles.panelKicker}>{t(language, 'activeChild')}</Text>
          <Text style={styles.panelTitle}>
            {profileLabel(activeProfile, language)}
          </Text>
          <Text style={styles.panelBody}>
            {t(language, 'childAge')}:{' '}
            {childAgeLabel(activeProfile.birthDate, language)}
          </Text>
        </InfoPanel>
      ) : null}

      {loadState.tracker.profiles.length > 0 ? (
        <View style={styles.detailList}>
          <Text style={styles.listTitle}>{t(language, 'selectChild')}</Text>
          {loadState.tracker.profiles.map((profile) => (
            <Pressable
              accessibilityRole="button"
              key={profile.id}
              onPress={() => void selectProfile(profile.id)}
              style={[
                styles.profileRow,
                profile.id === activeProfile?.id && styles.profileRowActive,
              ]}
            >
              <View style={styles.profileRowCopy}>
                <Text style={styles.profileRowTitle}>
                  {profileLabel(profile, language)}
                </Text>
                <Text style={styles.profileRowSubtitle}>
                  {profile.birthDate} · {profile.scheduleCountry}
                </Text>
              </View>
              <Text style={styles.profileRowAction}>
                {profile.id === activeProfile?.id
                  ? t(language, 'activeChild')
                  : t(language, 'switchProfile')}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      <View style={styles.buttonRow}>
        <Pressable
          accessibilityRole="button"
          onPress={() => setMode('add')}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>
            {t(language, 'addChild')}
          </Text>
        </Pressable>
        {activeProfile ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => setMode('edit')}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>
              {t(language, 'editProfile')}
            </Text>
          </Pressable>
        ) : null}
      </View>

      {activeProfile ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => void deleteActiveProfile()}
          style={styles.dangerButton}
        >
          <Text style={styles.dangerButtonText}>
            {confirmDelete
              ? t(language, 'confirmDelete')
              : t(language, 'deleteProfile')}
          </Text>
        </Pressable>
      ) : null}

      <InfoPanel accent="blue">
        <Text style={styles.panelKicker}>{t(language, 'privacyTitle')}</Text>
        <Text style={styles.panelTitle}>{t(language, 'sourceVersion')}</Text>
        <Text style={styles.panelBody}>{t(language, 'privacyBody')}</Text>
      </InfoPanel>

      <View style={styles.detailList}>
        <DetailRow
          label={t(language, 'sourceVersion')}
          value={snapshot.scheduleVersion ?? '-'}
        />
        <DetailRow
          label={t(language, 'effectiveDate')}
          value={snapshot.effectiveDate ?? '-'}
        />
        <DetailRow
          label={t(language, 'importedDate')}
          value={snapshot.importedDate ?? '-'}
        />
        <DetailRow
          label={t(language, 'milestone')}
          value={String(counts.childMilestones)}
        />
        <DetailRow label={t(language, 'healthOk')} value="OK" />
      </View>
    </View>
  );
}

function OnboardingScreen({
  language,
  loadState,
  onComplete,
}: {
  language: LanguageCode;
  loadState: Extract<LoadState, { status: 'ready' }>;
  onComplete: () => Promise<void>;
}) {
  return (
    <View style={styles.screen}>
      <InfoPanel accent="green">
        <Text style={styles.panelKicker}>{t(language, 'disclaimerTitle')}</Text>
        <Text style={styles.panelTitle}>{t(language, 'onboardingTitle')}</Text>
        <Text style={styles.panelBody}>{t(language, 'onboardingBody')}</Text>
      </InfoPanel>

      <ProfileForm
        language={language}
        onSubmit={async (draft) => {
          await createChildProfile(loadState.tracker.db, draft);
          await acceptDisclaimer(loadState.tracker.db);
          await onComplete();
        }}
        requireDisclaimer
        submitLabel={t(language, 'createProfile')}
      />
    </View>
  );
}

function ProfileForm({
  initialProfile,
  language,
  onCancel,
  onSubmit,
  requireDisclaimer = false,
  submitLabel,
}: {
  initialProfile?: ChildProfile;
  language: LanguageCode;
  onCancel?: () => void;
  onSubmit: (draft: ChildProfileDraft) => Promise<void>;
  requireDisclaimer?: boolean;
  submitLabel: string;
}) {
  const [nickname, setNickname] = useState(initialProfile?.nickname ?? '');
  const [birthDate, setBirthDate] = useState(initialProfile?.birthDate ?? '');
  const [sex, setSex] = useState<ChildSex>(initialProfile?.sex ?? 'not_set');
  const [incompleteHistory, setIncompleteHistory] = useState(
    initialProfile?.incompleteHistory ?? false,
  );
  const [acceptedDisclaimer, setAcceptedDisclaimer] =
    useState(!requireDisclaimer);
  const [errors, setErrors] = useState<ProfileValidationError[]>([]);
  const [disclaimerError, setDisclaimerError] = useState(false);
  const [saving, setSaving] = useState(false);
  const olderChild = isOlderChildForBackfill(birthDate);

  const submit = async () => {
    const draft: ChildProfileDraft = {
      birthDate: birthDate.trim(),
      incompleteHistory,
      nickname,
      scheduleCountry: 'BG',
      sex,
    };
    const nextErrors = validateProfileDraft(draft);
    setErrors(nextErrors);
    setDisclaimerError(requireDisclaimer && !acceptedDisclaimer);
    if (nextErrors.length > 0 || (requireDisclaimer && !acceptedDisclaimer)) {
      return;
    }

    setSaving(true);
    try {
      await onSubmit(draft);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.fieldLabel}>{t(language, 'childName')}</Text>
      <TextInput
        autoCapitalize="words"
        onChangeText={setNickname}
        placeholder={t(language, 'childNamePlaceholder')}
        style={styles.input}
        value={nickname}
      />

      <Text style={styles.fieldLabel}>{t(language, 'dateOfBirth')}</Text>
      <TextInput
        autoCapitalize="none"
        keyboardType="numbers-and-punctuation"
        onChangeText={setBirthDate}
        placeholder={t(language, 'birthDatePlaceholder')}
        style={styles.input}
        value={birthDate}
      />
      <ValidationErrors errors={errors} language={language} />

      <Text style={styles.fieldLabel}>{t(language, 'sex')}</Text>
      <View style={styles.segmented}>
        {(
          [
            ['not_set', 'preferNotToSay'],
            ['female', 'sexFemale'],
            ['male', 'sexMale'],
          ] as [ChildSex, StringKey][]
        ).map(([value, labelKey]) => (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: sex === value }}
            key={value}
            onPress={() => setSex(value)}
            style={[styles.segment, sex === value && styles.segmentActive]}
          >
            <Text
              style={[
                styles.segmentText,
                sex === value && styles.segmentTextActive,
              ]}
            >
              {t(language, labelKey)}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.staticField}>
        <Text style={styles.detailLabel}>{t(language, 'countrySchedule')}</Text>
        <Text style={styles.detailValue}>Bulgaria · BG</Text>
      </View>

      {olderChild ? (
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: incompleteHistory }}
          onPress={() => setIncompleteHistory((value) => !value)}
          style={styles.checkboxRow}
        >
          <View
            style={[
              styles.checkbox,
              incompleteHistory && styles.checkboxChecked,
            ]}
          />
          <View style={styles.checkboxCopy}>
            <Text style={styles.checkboxTitle}>
              {t(language, 'backfillLater')}
            </Text>
            <Text style={styles.checkboxBody}>
              {t(language, 'backfillLaterBody')}
            </Text>
          </View>
        </Pressable>
      ) : null}

      {requireDisclaimer ? (
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: acceptedDisclaimer }}
          onPress={() => setAcceptedDisclaimer((value) => !value)}
          style={styles.checkboxRow}
        >
          <View
            style={[
              styles.checkbox,
              acceptedDisclaimer && styles.checkboxChecked,
            ]}
          />
          <View style={styles.checkboxCopy}>
            <Text style={styles.checkboxTitle}>
              {t(language, 'acceptDisclaimer')}
            </Text>
            <Text style={styles.checkboxBody}>{t(language, 'disclaimer')}</Text>
            {disclaimerError ? (
              <Text style={styles.errorText}>
                {t(language, 'disclaimerRequired')}
              </Text>
            ) : null}
          </View>
        </Pressable>
      ) : null}

      <View style={styles.buttonRow}>
        <Pressable
          accessibilityRole="button"
          disabled={saving}
          onPress={() => void submit()}
          style={[styles.primaryButton, saving && styles.disabledButton]}
        >
          <Text style={styles.primaryButtonText}>{submitLabel}</Text>
        </Pressable>
        {onCancel ? (
          <Pressable
            accessibilityRole="button"
            onPress={onCancel}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>
              {t(language, 'cancel')}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

function ValidationErrors({
  errors,
  language,
}: {
  errors: ProfileValidationError[];
  language: LanguageCode;
}) {
  if (errors.length === 0) {
    return null;
  }
  return (
    <View style={styles.errorList}>
      {errors.map((error) => (
        <Text key={error} style={styles.errorText}>
          {profileErrorText(language, error)}
        </Text>
      ))}
    </View>
  );
}

function LoadingState({ language }: { language: LanguageCode }) {
  return (
    <View style={styles.centerState}>
      <ActivityIndicator color="#0f766e" size="large" />
      <Text style={styles.centerText}>{t(language, 'loading')}</Text>
    </View>
  );
}

function ErrorState({
  language,
  message,
  onRetry,
}: {
  language: LanguageCode;
  message: string;
  onRetry: () => void;
}) {
  return (
    <View style={styles.centerState}>
      <Text style={styles.errorTitle}>{t(language, 'databaseError')}</Text>
      <Text style={styles.centerText}>{message}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={onRetry}
        style={styles.primaryButton}
      >
        <Text style={styles.primaryButtonText}>{t(language, 'retry')}</Text>
      </Pressable>
    </View>
  );
}

function LanguageSwitch({
  language,
  onChange,
}: {
  language: LanguageCode;
  onChange: (language: LanguageCode) => void;
}) {
  return (
    <View style={styles.languageSwitch}>
      {(['bg', 'en'] as const).map((item) => (
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: item === language }}
          key={item}
          onPress={() => onChange(item)}
          style={[
            styles.languageButton,
            item === language && styles.languageButtonActive,
          ]}
        >
          <Text
            style={[
              styles.languageButtonText,
              item === language && styles.languageButtonTextActive,
            ]}
          >
            {item.toUpperCase()}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

function InfoPanel({
  accent,
  children,
}: {
  accent: 'amber' | 'blue' | 'green' | 'rose';
  children: React.ReactNode;
}) {
  return (
    <View style={[styles.panel, styles[`${accent}Panel`]]}>{children}</View>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function DoseLine({
  doses,
  label,
  names,
  tone,
}: {
  doses: TimelineMilestone['mandatory'];
  label: string;
  names: Record<string, string>;
  tone: 'mandatory' | 'recommended';
}) {
  const visible = doses.slice(0, 3).map((dose) => doseLabel(dose, names));
  const overflow = doses.length - visible.length;
  return (
    <View style={styles.doseLine}>
      <Text
        style={[
          styles.dosePill,
          tone === 'mandatory' ? styles.pillTeal : styles.pillAmber,
        ]}
      >
        {label}
      </Text>
      <Text style={styles.doseText}>
        {visible.join(', ')}
        {overflow > 0 ? ` +${overflow}` : ''}
      </Text>
    </View>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

function importStatusText(
  language: LanguageCode,
  status: TrackerDatabaseState['importResult']['status'],
) {
  if (status === 'created') {
    return t(language, 'installStatusCreated');
  }
  if (status === 'updated') {
    return t(language, 'installStatusUpdated');
  }
  return t(language, 'installStatusCurrent');
}

function profileLabel(profile: ChildProfile, language: LanguageCode): string {
  return profile.nickname ?? (language === 'bg' ? 'Дете' : 'Child');
}

function profileErrorText(
  language: LanguageCode,
  error: ProfileValidationError,
): string {
  const keyByError: Record<ProfileValidationError, StringKey> = {
    birth_date_format: 'birthDateErrorFormat',
    birth_date_future: 'birthDateErrorFuture',
    birth_date_required: 'birthDateErrorRequired',
    birth_date_too_old: 'birthDateErrorOld',
    history_choice_required: 'birthDateErrorHistory',
  };
  return t(language, keyByError[error]);
}

const styles = StyleSheet.create({
  amberPanel: {
    borderColor: '#f59e0b',
  },
  appShell: {
    flex: 1,
    paddingHorizontal: 18,
  },
  bluePanel: {
    borderColor: '#2563eb',
  },
  centerState: {
    alignItems: 'center',
    gap: 14,
    justifyContent: 'center',
    minHeight: 360,
    padding: 24,
  },
  centerText: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
  },
  content: {
    paddingBottom: 28,
    paddingTop: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  checkbox: {
    borderColor: '#94a3b8',
    borderRadius: 4,
    borderWidth: 2,
    height: 22,
    marginTop: 2,
    width: 22,
  },
  checkboxBody: {
    color: '#475569',
    fontSize: 14,
    lineHeight: 20,
  },
  checkboxChecked: {
    backgroundColor: '#0f766e',
    borderColor: '#0f766e',
  },
  checkboxCopy: {
    flex: 1,
    gap: 4,
  },
  checkboxRow: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 14,
  },
  checkboxTitle: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '800',
  },
  dangerButton: {
    alignItems: 'center',
    borderColor: '#e11d48',
    borderRadius: 6,
    borderWidth: 1,
    minHeight: 44,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  dangerButtonText: {
    color: '#be123c',
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
  detailLabel: {
    color: '#64748b',
    flex: 1,
    fontSize: 14,
  },
  detailList: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderRadius: 8,
    borderWidth: 1,
  },
  detailRow: {
    alignItems: 'center',
    borderBottomColor: '#e2e8f0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 12,
    minHeight: 52,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  detailValue: {
    color: '#111827',
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
  },
  doseLine: {
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 10,
  },
  dosePill: {
    borderRadius: 5,
    color: '#111827',
    fontSize: 12,
    fontWeight: '800',
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  doseText: {
    color: '#334155',
    fontSize: 14,
    lineHeight: 20,
  },
  errorTitle: {
    color: '#be123c',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  errorList: {
    gap: 4,
  },
  errorText: {
    color: '#be123c',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  fieldLabel: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '800',
  },
  form: {
    gap: 12,
  },
  greenPanel: {
    borderColor: '#0f766e',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
    justifyContent: 'space-between',
    paddingBottom: 14,
    paddingTop: 18,
  },
  headerCopy: {
    flex: 1,
  },
  languageButton: {
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    minHeight: 34,
    minWidth: 42,
  },
  languageButtonActive: {
    backgroundColor: '#111827',
  },
  languageButtonText: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '800',
  },
  languageButtonTextActive: {
    color: '#ffffff',
  },
  languageSwitch: {
    backgroundColor: '#e2e8f0',
    borderRadius: 7,
    flexDirection: 'row',
    padding: 3,
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#cbd5e1',
    borderRadius: 7,
    borderWidth: 1,
    color: '#111827',
    fontSize: 16,
    minHeight: 46,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  listTitle: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '800',
    paddingHorizontal: 14,
    paddingTop: 14,
  },
  metric: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: '47%',
    flexGrow: 1,
    minHeight: 92,
    padding: 14,
  },
  metricLabel: {
    color: '#64748b',
    flexWrap: 'wrap',
    fontSize: 13,
    fontWeight: '700',
  },
  metricValue: {
    color: '#111827',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  panel: {
    backgroundColor: '#ffffff',
    borderLeftWidth: 4,
    borderRadius: 8,
    padding: 16,
  },
  panelBody: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22,
  },
  panelKicker: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  panelTitle: {
    color: '#111827',
    fontSize: 21,
    fontWeight: '800',
    lineHeight: 26,
    marginBottom: 8,
  },
  pillAmber: {
    backgroundColor: '#fef3c7',
  },
  pillTeal: {
    backgroundColor: '#ccfbf1',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#0f766e',
    borderRadius: 6,
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  profileRow: {
    alignItems: 'center',
    borderTopColor: '#e2e8f0',
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 12,
    minHeight: 62,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  profileRowAction: {
    color: '#0f766e',
    flexShrink: 1,
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'right',
  },
  profileRowActive: {
    backgroundColor: '#f0fdfa',
  },
  profileRowCopy: {
    flex: 1,
    gap: 3,
  },
  profileRowSubtitle: {
    color: '#64748b',
    fontSize: 13,
  },
  profileRowTitle: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '800',
  },
  rosePanel: {
    borderColor: '#e11d48',
  },
  safeArea: {
    backgroundColor: '#f8fafc',
    flex: 1,
  },
  screen: {
    gap: 14,
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#cbd5e1',
    borderRadius: 6,
    borderWidth: 1,
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  secondaryButtonText: {
    color: '#334155',
    fontSize: 15,
    fontWeight: '800',
  },
  segment: {
    alignItems: 'center',
    borderRadius: 6,
    flex: 1,
    justifyContent: 'center',
    minHeight: 40,
    paddingHorizontal: 6,
  },
  segmentActive: {
    backgroundColor: '#111827',
  },
  segmentText: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
  segmentTextActive: {
    color: '#ffffff',
  },
  segmented: {
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 4,
    padding: 4,
  },
  staticField: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    minHeight: 48,
    paddingHorizontal: 14,
  },
  subtitle: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  tab: {
    alignItems: 'center',
    borderRadius: 6,
    flex: 1,
    justifyContent: 'center',
    minHeight: 42,
  },
  tabActive: {
    backgroundColor: '#ffffff',
  },
  tabBar: {
    backgroundColor: '#dbeafe',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 4,
    padding: 4,
  },
  tabText: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
  tabTextActive: {
    color: '#111827',
  },
  timelineItem: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderRadius: 8,
    borderWidth: 1,
    padding: 14,
  },
  timelineMilestone: {
    color: '#111827',
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 23,
  },
  title: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
  },
});
