var hbversion = 4.5;
var hbref = '85949';
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
    const jdata = {"hb": "ours", "fold": "btf", "gdpr": 50, "manual": {"sound": "0", "auction": "", "players": [""], "autoplay": "0", "instream": "0", "skipable": "0", "outstream": "0", "pricefloor": ""}, "ctr_rate": {"ppc": 0.0000562366437970982, "rtb": 1, "total": 0.0000562366437970982, "ppc_view": 35564, "rtb_view": 0, "ppc_click": 2, "rtb_click": 0}, "gaAdUnitCode": "etarget-id-85949", "viewability_rate": {"total": 0.108870967741935, "mobile": 1, "desktop": 0.109311740890688}};
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
refstyling.font = 'verdana'.length>0 ? 'verdana' : 'arial';
refstyling.fsi = '14'.length>0 ? '14px' : '18px';
refstyling.bg = 'ffffff'.length>0 ? ('ffffff'=='transparent' ? 'transparent' : '#ffffff') : 'transparent';
refstyling.title = {
    color:'000000'.length>0 ? '#000000' : 'black',
    hcolor:'000000'.length>0 ? '#000000' : 'black'
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
            if(window.ethb.variables.domain['85949']){
                console.log('HB config for','85949','already exists');
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
                ['domain','85949','bg'],
                ['supplier','85949','15640'],
                ['globalFallback','85949',''],
                ['globalFallbackType','85949',''],
                ['globalFallbackPubID','85949','-1'],
                ['globalFallbackSlotID','85949',''],
                ['globalFallbackRate','85949',parseFloat('0')],
                ['globalFallbackPrice','85949',parseFloat('0.1')],
                ['globalFallbackPriceFirst','85949',parseFloat('0')],
                ['globalFallbackPrcEtarget','85949','0'],
                ['globalFallbackPrcAdsense','85949','0'],
                ['globalNoFallback','85949',('nofallback'.length>0 ? true : false)],
                ['globalRefreshInterval','85949',parseInt('0')],
                ['globalRefreshScript','85949',''],
                ['fixed_close','85949',''],
                ['fixed_position','85949',''],
                ['fixed_top','85949',''],
                ['fixed_right','85949',''],
                ['fixed_bottom','85949',''],
                ['fixed_left','85949',''],
                ['adapterTimeout','0',parseInt('3000')],
                ['mediatypes','85949',['banner','native']],
                ['refstyling','85949',refstyling],
                ['systemBlockFlag','85949',{
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
                ['systemChargePerc','85949',{
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
                ['85949',JSON.parse('[]')]
            ]
        }
    );
    
    
    window.ethb.que.push(function(){
        window.ethb.init('85949','620','200'); 
        window.ethb.addSizes('85949','620x200,468x60,468x120,300x100'.replace(/ /g,'').replace(/,/g,';').split(';'));
        window.ethb.addSuperOptions('85949');
        var foldPosition = window.ethb.getFold('85949');

        var adapterData = {
            etr:[{
                active: !!('620200'!='1010' && window.ethb.getKeyProperty('85949','systemBlockFlag').etr===0),
                bidder: 'etarget',
                params:{
                    refid:85949,
                    country:6,
                    position: foldPosition
                }
              
            }],
            tds:[{
                active: !!(!parseInt('0') && ''.length>0 && ''.length>0 && window.ethb.getKeyProperty('85949','systemBlockFlag').tds===0),
                bidder: 'teads',
                params: {
                    pageId:'',
                    placementId:''
                }
               
            }],
            pls:[{
                active: !!(!parseInt('0') && ''.length>0 && window.ethb.getKeyProperty('85949','systemBlockFlag').pls===0),
                bidder: 'pulsepoint',
                params: {
                    cf:'',
                    cp:'',
                    ct:'',
                    position: foldPosition
                }
                
            }],
            rub:[{
                active: !!(!parseInt('0') && '11352'.length>0 && window.ethb.getKeyProperty('85949','systemBlockFlag').rub===0),
                bidder: 'rubicon',
                params: {
                    accountId: '11352',
                    siteId: '190390',
                    zoneId: '2706634',
                    position: foldPosition
                }
               
            }],
            pmt:[{
                active: !!(!parseInt('0') && ''.length>0 && window.ethb.getKeyProperty('85949','systemBlockFlag').pmt===0),
                bidder: 'pubmatic',
                params: {
                    publisherId: '',
                    adSlot: ''
                }
            }],
            svr:[{
                active: !!(!parseInt('0') && ''.length>0 && window.ethb.getKeyProperty('85949','systemBlockFlag').svr===0),
                bidder: 'sovrn',
                params: {
                    tagid: ''
                }
               
            }],
            idx:[{
                active: !!(!parseInt('0') && ''.length>0 && window.ethb.getKeyProperty('85949','systemBlockFlag').pmt===0),
                bidder: 'ix',
                params: {
                    siteId: ''
                }
               
            }]
        };

        let sizesArr = '620x200,468x60,468x120,300x100'.replace(/ /g,'').replace(/,/g,';').split(';');
        let sizesToAdd = []
        sizesArr.forEach(elem => {
            let tmpArr = [parseInt(elem.split('x')[0]), parseInt(elem.split('x')[1])]
            sizesToAdd.push(tmpArr)
        })
       
        var adapterCodes = {};

        adapterCodes['adf'] = '1609082'.split(',');
        adapterCodes['apn'] = '19557337'.split(',');
        for(var k in adapterCodes){
            var adapterCode = adapterCodes[k];
            for(var j in adapterCode){
                var code = adapterCode[j];
                var fixedSize = '';
                if(code.length>0){
                    var active = !!(!parseInt('0') && code.length>0 && window.ethb.getKeyProperty('85949','systemBlockFlag')[k]===0);
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
     
        window.ethb.addAdapters('85949',adapterData);
        window.ethb.setPrebid();
        window.ethb.hbSetCookie('_et_hb_15640_ff',parseInt(window.ethb.hbGetCookie('_et_hb_15640_ff'))+1,24);
    });


})();