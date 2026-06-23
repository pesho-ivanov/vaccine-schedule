var hbversion = 4.5;
var hbref = '84094';
var iniscrpts = document.getElementsByTagName('script');
var initExist = false;
for(var ki in iniscrpts){
    var inisc = iniscrpts[ki];
    if(typeof(inisc)=='object' && inisc.src){
        if(inisc.src.length>0 && inisc.src.indexOf('init2.0.js')>0 && inisc.src.indexOf('etarget')>0){
            initExist = true;
        }
    }
}

if (hbref == '55297') {
    const jdata = {"hb": "ours", "fold": "btf", "gdpr": 50, "manual": {"sound": "0", "auction": "", "players": [""], "autoplay": "0", "instream": "0", "skipable": "0", "outstream": "0", "pricefloor": ""}, "ctr_rate": {"ppc": 0.000472988952329471, "rtb": 0.00615384615384615, "total": 0.000534687875952413, "ppc_view": 29599, "rtb_view": 325, "ppc_click": 14, "rtb_click": 2}, "gaAdUnitCode": "code_84094_300x600_84", "viewability_rate": {"total": 0.51864406779661, "mobile": 1, "desktop": 0.517123287671233}};
    //TODO:
    console.log(jdata)
    let deviceWidth = window.top.document.body.clientWidth
    const estyle = document.createElement('style');
    let sticky_value = 'left'
    let sticky_pos = ''
    let dev_type = 'desktop'
    let mobile_settings = 'right:unset;left:unset;width:100%;height:auto;display:flex;justify-content:center;background-color: rgba(0,0,0,0.5);'
    let x_settings = ''
    if (deviceWidth < 500) {
        dev_type = 'mobile'
    }
    
    
    switch (sticky_value) {
        case 'left':
            sticky_pos = dev_type == 'desktop' ? 'left:0px;' : mobile_settings
            x_settings = dev_type == 'desktop' ? 'right:-12px;' : 'right:' + (((deviceWidth-300)/2)-15) + 'px;'
            break;
        case 'right':
            sticky_pos = dev_type == 'desktop' ? 'right:0px;' : mobile_settings
            x_settings = dev_type == 'desktop' ? 'left:-12px;' : 'right:' + (((deviceWidth-300)/2)-15) + 'px;'
            break;
        case 'middle':
            sticky_pos = dev_type == 'desktop' ? 'left:unset;right:unset;' : mobile_settings
            x_settings = dev_type == 'desktop' ? 'right:-12px;' : 'right:' + (((deviceWidth-300)/2)-15) + 'px;'
            break;
        default:
            sticky_pos = dev_type == 'desktop' ? 'left:0px;' : mobile_settings
            x_settings = dev_type == 'desktop' ? 'right:-12px;' : 'right:' + (((deviceWidth-300)/2)-15) + 'px;'
    }

    estyle.textContent = `
        .etarget-hb-wrap {
            position: fixed;
            z-index: 9999999;       
            bottom: 0px;
            pointer-events:none;
            ` + sticky_pos + `
        }
        .etarget-hb-wrap:after {
            content: "x";
            width: 25px;
            height: 25px;
            border: 2px solid #d30303;
            text-decoration:none;
            border-radius:50%;
            font-size: 22px;
            line-height: 20px;
            background: #fff;
            color: #d30303;
            font-weight: 700;
            text-align:center;
            display:block;
            position: absolute;
            pointer-events:auto;
            top: -16px;
            `+  x_settings + `
            cursor: pointer;
        }
    `;
    window.top.document.head.appendChild(estyle);

    window.top.document.querySelector('.etarget-hb-wrap').addEventListener('click', function(e) {
        e.target.style.display = 'none'
    })
}



if(!initExist && (typeof(window.ethb)=='undefined' || (typeof(window.ethb)=='object' && typeof(window.ethb.init)=='undefined'))){
    var scrpt = document.createElement('script');
    scrpt.src = 'https://etargetcdn.com/hb/init2.0.js';
    scrpt.async = true;
    document.head.appendChild(scrpt);
}

var refstyling = {};
refstyling.font = ''.length>0 ? '' : 'arial';
refstyling.fsi = ''.length>0 ? 'px' : '18px';
refstyling.bg = 'ffffff'.length>0 ? ('ffffff'=='transparent' ? 'transparent' : '#ffffff') : 'transparent';
refstyling.title = {
    color:'0066d5'.length>0 ? '#0066d5' : 'black',
    hcolor:'0066d5'.length>0 ? '#0066d5' : 'black'
};
refstyling.text = {
    color:'000000'.length>0 ? '#000000' : 'black',
    hcolor:'000000'.length>0 ? '#000000' : 'black'
};
refstyling.link = {
    color:'0066d5'.length>0 ? '#0066d5' : 'black',
    hcolor:'0066d5'.length>0 ? '#0066d5' : 'black',
    underline:parseInt('0')>0 ? 1 : 0
};

var configExists = false;
var _et_supplier = '15640';
if(typeof(window.ethb)=='object'){
    if(typeof(window.ethb.variables)=='object'){
        if(typeof(window.ethb.variables.domain)=='object'){
            if(window.ethb.variables.domain['84094']){
                console.log('HB config for','84094','already exists');
                configExists = true;
            }
        }
    }
}

(function(){

    if(configExists){
        return;
    }

    window.ethb = window.ethb || {};
    window.ethb.que = window.ethb.que || [];

    window.ethb.que.push(
        {
            setKeyProperty:[
                ['domain','84094','bg'],
                ['supplier','84094','15640'],
                ['globalFallback','84094',''],
                ['globalFallbackType','84094',''],
                ['globalFallbackPubID','84094','-1'],
                ['globalFallbackSlotID','84094',''],
                ['globalFallbackRate','84094',parseFloat('0')],
                ['globalFallbackPrice','84094',parseFloat('0.1')],
                ['globalFallbackPriceFirst','84094',parseFloat('0')],
                ['globalFallbackPrcEtarget','84094','0'],
                ['globalFallbackPrcAdsense','84094','0'],
                ['globalNoFallback','84094',('nofallback'.length>0 ? true : false)],
                ['globalRefreshInterval','84094',parseInt('0')],
                ['globalRefreshScript','84094',''],
                ['fixed_close','84094',''],
                ['fixed_position','84094',''],
                ['fixed_top','84094',''],
                ['fixed_right','84094',''],
                ['fixed_bottom','84094',''],
                ['fixed_left','84094',''],
                ['adapterTimeout','0',parseInt('3000')],
                ['mediatypes','84094',['banner','native']],
                ['refstyling','84094',refstyling],
                ['systemBlockFlag','84094',{
                    ppc:parseInt('0'),
                    etr:parseInt('0'),
                    adf:parseInt('0'),
                    apn:parseInt('0'),
                    rub:parseInt('0'),
                    pls:parseInt('0'),
                    tds:parseInt('0'),
                    idx:parseInt('0'),
                    pmt:parseInt('0'),
                    svr:parseInt('0')
                }],
                ['systemChargePerc','84094',{
                    adf:parseFloat('0'),
                    rub:parseFloat('0'),
                    apn:parseFloat('0'),
                    tds:parseFloat('0')
                }]
            ]
            
        }
    );

    window.ethb.que.push(
        {
            addEvent:[
                ['84094',JSON.parse('[]')]
            ]
        }
    );
    
    
    window.ethb.que.push(function(){
        window.ethb.init('84094','300','600'); 
        window.ethb.addSizes('84094',''.replace(/ /g,'').replace(/,/g,';').split(';'));
        window.ethb.addSuperOptions('84094');
        var foldPosition = window.ethb.getFold('84094');

        var adapterData = {
            etr:[{
                active: !!('300600'!='1010' && window.ethb.getKeyProperty('84094','systemBlockFlag').etr===0),
                bidder: 'etarget',
                params:{
                    refid:84094,
                    country:6,
                    position: foldPosition
                }
              
            }],
            tds:[{
                active: !!(!parseInt('0') && ''.length>0 && ''.length>0 && window.ethb.getKeyProperty('84094','systemBlockFlag').tds===0),
                bidder: 'teads',
                params: {
                    pageId:'',
                    placementId:''
                }
               
            }],
            pls:[{
                active: !!(!parseInt('0') && ''.length>0 && window.ethb.getKeyProperty('84094','systemBlockFlag').pls===0),
                bidder: 'pulsepoint',
                params: {
                    cf:'',
                    cp:'',
                    ct:'',
                    position: foldPosition
                }
                
            }],
            rub:[{
                active: !!(!parseInt('0') && '11352'.length>0 && window.ethb.getKeyProperty('84094','systemBlockFlag').rub===0),
                bidder: 'rubicon',
                params: {
                    accountId: '11352',
                    siteId: '190390',
                    zoneId: '1037508',
                    position: foldPosition
                }
               
            }],
            pmt:[{
                active: !!(!parseInt('0') && ''.length>0 && window.ethb.getKeyProperty('84094','systemBlockFlag').pmt===0),
                bidder: 'pubmatic',
                params: {
                    publisherId: '',
                    adSlot: ''
                }
            }],
            svr:[{
                active: !!(!parseInt('0') && '1010791'.length>0 && window.ethb.getKeyProperty('84094','systemBlockFlag').svr===0),
                bidder: 'sovrn',
                params: {
                    tagid: '1010791'
                }
               
            }],
            idx:[{
                active: !!(!parseInt('0') && ''.length>0 && window.ethb.getKeyProperty('84094','systemBlockFlag').pmt===0),
                bidder: 'ix',
                params: {
                    siteId: ''
                }
               
            }]
        };

        let sizesArr = ''.replace(/ /g,'').replace(/,/g,';').split(';');
        let sizesToAdd = []
        sizesArr.forEach(elem => {
            let tmpArr = [parseInt(elem.split('x')[0]), parseInt(elem.split('x')[1])]
            sizesToAdd.push(tmpArr)
        })
       
        var adapterCodes = {};

        adapterCodes['adf'] = '594851'.split(',');
        adapterCodes['apn'] = '13843700'.split(',');
        for(var k in adapterCodes){
            var adapterCode = adapterCodes[k];
            for(var j in adapterCode){
                var code = adapterCode[j];
                var fixedSize = '';
                if(code.length>0){
                    var active = !!(!parseInt('0') && code.length>0 && window.ethb.getKeyProperty('84094','systemBlockFlag')[k]===0);
                    var adapter = {};
                    switch(k){
                        case 'adf':{
                            
                            var acode;
                            var ccode;
                            var csize;
                            var adfBidCpm;
                            if (code.includes(':')) {
                                acode = code.split(':');
                                ccode = acode[0];
                                csize = acode[1];
                                if (code.split(':').length == 3) {
                                    adfBidCpm = parseFloat(acode[2]);
                                }
                            }
                            else {
                                ccode = code;
                                csize = 0;
                            }
                            
                            adapter.bidder = 'adform';
                            adapter.params = {
                                mid: ccode
                            };
                            
                            if (adfBidCpm) {
                                adapter.bidCpmAdjustment =  function(bidCpm) { return bidCpm * adfBidCpm; }
                            }
                            if (csize != 0) {
                                if(typeof(csize)=='string'){
                                    if(csize.length>0){
                                        
                                        addSize = csize.split('x');
                                        
                                       
                                        if(addSize){
                                            
                                            adapter.sizeConfig = [{ minViewPort: [0, 0], sizes: [[parseInt(addSize[0]), parseInt(addSize[1])]] }];                  
                                        }
                                        if (adfBidCpm) {
                                            
                                            window.ethb.setbidCpm(adfBidCpm);
                                        }
                                        
                                    }
                                }
                            }
                            else {
                                adapter.sizeConfig = [
                                        { minViewPort: [0, 0], sizes: sizesToAdd }
                                ];
                            }
                            
                        }; break;
                        case 'apn':{
                            adapter.bidder = 'appnexus';
                            adapter.params = {
                                placementId: code,
                                position: foldPosition,
                                video:{
                                    skippable:true,
                                    playback_method:['auto_play_sound_off']
                                }
                            };
                           
                        }; break;
                        default: {
                             adapter.sizeConfig = [
                                        { minViewPort: [0, 0], sizes: sizesToAdd }
                                ];
                        };
                    }
                    if(typeof(adapter.params)=='object'){
                        adapter.active = active;
                        if(typeof(adapterData[k])=='undefined'){
                            adapterData[k] = [];
                        }
                        adapterData[k].push(adapter);
                    }
                }
            }
        }
     
        window.ethb.addAdapters('84094',adapterData);
        window.ethb.setPrebid();
        window.ethb.hbSetCookie('_et_hb_15640_ff',parseInt(window.ethb.hbGetCookie('_et_hb_15640_ff'))+1,24);
    });


})();