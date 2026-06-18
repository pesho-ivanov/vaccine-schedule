import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { BUNDLED_SCHEDULE } from './src/data/bundledSchedule';
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
  getDatabaseSnapshot,
  initializeTrackerDatabase,
  saveSetting,
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

  const loadDatabase = useCallback(async () => {
    setLoadState({ status: 'loading' });
    logAppHealth('app_boot');
    try {
      const tracker = await initializeTrackerDatabase();
      setLanguageState(tracker.snapshot.language);
      setLoadState({ status: 'ready', tracker });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unknown database error';
      logAppHealth('database_error', message);
      setLoadState({ status: 'error', message });
    }
  }, []);

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
  timeline: TimelineMilestone[];
}

function ReadyScreen({
  activeTab,
  antigensById,
  counts,
  language,
  loadState,
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
      />
    );
  }
  return (
    <TodayScreen counts={counts} language={language} loadState={loadState} />
  );
}

function TodayScreen({
  counts,
  language,
  loadState,
}: Pick<ReadyScreenProps, 'counts' | 'language' | 'loadState'>) {
  return (
    <View style={styles.screen}>
      <InfoPanel accent="green">
        <Text style={styles.panelKicker}>{t(language, 'localReady')}</Text>
        <Text style={styles.panelTitle}>{t(language, 'noProfileTitle')}</Text>
        <Text style={styles.panelBody}>{t(language, 'noProfileBody')}</Text>
      </InfoPanel>

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
}: Pick<ReadyScreenProps, 'counts' | 'language' | 'loadState'>) {
  const snapshot = loadState.tracker.snapshot;

  return (
    <View style={styles.screen}>
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
    backgroundColor: '#0f766e',
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
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
