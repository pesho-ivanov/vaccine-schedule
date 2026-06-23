if (
  typeof window.ethb == "undefined" ||
  typeof window.ethb.init == "undefined"
) {
  class ethb {
    constructor() {
      this.date_init = new Date();
      this.date_start = 0;
      this.date_end = 0;
      this.date_request = 0;
      this.newBidCpm = 1.0;
      this.logDebug("start", this.date_init);
      this.timestamp = Math.floor(Date.now());
      this.adapters = [];
      this.queue = [];
      this.variables = [];
      this.sizes = [];
      this.extPair = {
        adform: "adf",
        appnexus: "apn",
        rubicon: "rub",
        teads: "tds",
        etarget: "etr",
        pulsepoint: "pls",
      };

      this.que = {};
      this.que.push = this.rePush;
    }

    init() {
      var ref = parseInt(arguments[0]);
      var w = parseInt(arguments[1]);
      var h = parseInt(arguments[2]);

      this.setProperty(["refid", ref]);

      var wrapper = this.getWrapper(ref);

      var codeClass =
        "code_" +
        ref +
        "_" +
        w +
        "x" +
        h +
        "_" +
        parseInt(Math.random() * 1000);
      var codeID = "etarget-id-" + ref;

      if (wrapper) {
        wrapper.className = codeClass;
      }

      this.logDebug("init", "after", ref, codeID, wrapper);

      this.setKeyProperty(["codeid", ref, codeID]);
      this.setKeyProperty(["wrapper", ref, wrapper]);
      this.setKeyProperty(["size", ref, [w, h]]);

      this.addSizes(ref, [[w, h]]);
      this.addCustomStyle(ref);
    }

    refresh(ref, func) {
      var codeid = this.getKeyProperty(ref, "codeid");
      var divid = "etarget-id-" + ref;

      this.logDebug("refresh", ref, codeid, func);

      if (typeof func == "string") {
        if (func == "_r") {
        } else {
          try {
            this.doEval(func);
          } catch (e) {
            this.logError("refresh", ref, func);
          }
          return false;
        }
      }

      pbjs.que.push(function () {
        pbjs.requestBids({
          adUnitCodes: [divid],
          timeout: 500,
          bidsBackHandler: function (e, n) {
            window.ethb.response(e, n, ref);
          },
        });
      });
    }

    addSuperOptions(ref) {
      var close = this.getKeyProperty(ref, "fixed_close");
      var fixed_position = this.getKeyProperty(ref, "fixed_position");
      var fixed_top = this.getKeyProperty(ref, "fixed_top");
      var fixed_right = this.getKeyProperty(ref, "fixed_right");
      var fixed_bottom = this.getKeyProperty(ref, "fixed_bottom");
      var fixed_left = this.getKeyProperty(ref, "fixed_left");
      var parent = this.getKeyProperty(ref, "wrapper");

      var closablecss = "background-repeat:no-repeat;border:10px solid transparent;box-sizing:content-box !important;";
      var leftclose = "";
      var topclose = "";
      if (fixed_position.length > 0) {
        parent.parentNode.style.position = fixed_position;
        parent.parentNode.style.zIndex = 9999995;
        parent.parentNode.style.backgroundColor = "white";
        if (fixed_top.length > 0) {
          parent.parentNode.style.top = fixed_top;
          closablecss += "bottom:-20px;";
          topclose = "top";
        }
        if (fixed_right.length > 0) {
          parent.parentNode.style.right = fixed_right;
          closablecss += "left:-20px;";
          leftclose = "right";
        }
        if (fixed_bottom.length > 0) {
          parent.parentNode.style.bottom = fixed_bottom;
          closablecss += "top:-20px;";
          topclose = "bottom";
        }
        if (fixed_left.length > 0) {
          parent.parentNode.style.left = fixed_left;
          closablecss += "right:-20px;";
          leftclose = "left";
        }
      }
      var arrow = "arrow-" + topclose + "-" + leftclose;

      if (close.length > 0) {
        if (!closablecss) {
          closablecss = "top:-10px;right:-10px;";
          closablecss = "background-repeat:no-repeat;border:10px solid transparent;box-sizing:content-box !important;top: -20px; right: -20px;";
        }
        var closediv = document.createElement("div");
        closediv.className = "close_hb";
        var origcss =
          "cursor:pointer;background-image:url(//sk.search.etargetnet.com/img/close_icon.png);background-position:center;background-size:cover;width:20px;height:20px;position:absolute;z-index:9999905;" +
          closablecss;
        var additcss = "";
        if (fixed_position != "fixed") {
          additcss = ";display:none;";
        }
        closediv.style.cssText = origcss + additcss;
        parent.parentNode.appendChild(closediv);
        parent.style.overflow = "hidden";
        closediv.addEventListener("click", function () {
          if (this.parentNode.clientWidth == 0) {
            parent.style.maxWidth = "100%";
            parent.style.maxHeight = "100%";
            closediv.style.cssText = origcss;
          } else {
            parent.style.maxWidth = "0px";
            parent.style.maxHeight = "0px";
            var newcss = origcss
              .replace("close_icon", arrow)
              .replace(/-10/g, "-20");
            closediv.style.cssText = newcss;
          }
        });
      }
    }

    addCustomStyle(ref) {
      var style = document.createElement("style");
      var cs = this.getKeyProperty(ref, "refstyling");
      if (typeof cs == "object") {
        if (cs.length > 0) {
          style.innerHTML =
            style.innerHTML +
            "body{cursor:pointer;font-family:" +
            window.styling[hb.id].font +
            "; font-size:" +
            window.styling[hb.id].fsi +
            "; background-color:" +
            window.styling[hb.id].bg +
            "}";
          style.innerHTML =
            style.innerHTML +
            ".title{color:" +
            window.styling[hb.id].title.color +
            "}";
          style.innerHTML =
            style.innerHTML +
            ".title:hover{color:" +
            window.styling[hb.id].title.hcolor +
            "}";
          style.innerHTML =
            style.innerHTML +
            ".body{color:" +
            window.styling[hb.id].text.color +
            "}";
          style.innerHTML =
            style.innerHTML +
            ".body:hover{color:" +
            window.styling[hb.id].text.hcolor +
            "}";
        }
      }
      var wrap = this.getKeyProperty(ref, "wrapper");
      wrap.appendChild(style);
    }

    buildWithTCF() {
      this.logDebug("buildWithTCF");

      __tcfapi("addEventListener", 2, function (a, b) {
        if (b) {
          var status = a.eventStatus;
          if (status == "tcloaded" || status == "useractioncomplete") {
            if (typeof a.listenerId != "undefined") {
              __tcfapi("removeEventListener", 2, function () {}, a.listenerId);
            }
            if (!window.ethb.date_request) {
              window.ethb.buildFrom("event");
            }
          }
        }
      });

      setTimeout(function () {
        if (!window.ethb.date_request) {
          window.ethb.buildFrom("timeout");
        }
      }, 2000);
    }

    buildFrom(from) {
      this.logDebug("build", from);

      window.ethb.date_request = new Date();

      window.ethb.gdpr = 1;

      var atimeout = this.getKeyProperty(0, "adapterTimeout");
      if (!atimeout) {
        atimeout = 3000;
      }
      
//      console.log(_et_supplier)

      //function initializePrebid() {
        pbjs.que.push(function () {
            pbjs.setConfig({
              enableTIDs: true,
                userSync: {
                  userIds: [{
                    name: 'teadsId',
                    params: {
                        pubId: 27884
                    },
                    bidders: ['teads'],
                    storage: {
                      type: "cookie&html5",
                      name: "_teadsId",
                      expires: 365
                    }
                  }, {
                    name: 'sharedId',
                    storage: {
                      type: "cookie",
                      name: "_sharedID",
                      expires: 30
                    }
                  }]
              },
                consentManagement: {
                  gdpr: {
                    cmpApi: "iab",
                    timeout: 10000,
                    defaultGdprScope: true
                  }
                },
                currency: {
                  adServerCurrency: "EUR",
                  defaultRates: { "USD": { "EUR": 1.09 }}
                },
                schain: {
                  validation: "strict",
                  config: {
                  ver:"1.0",
                  complete: 1,
                  nodes: [
                      {
                      asi:"etarget.sk",
                      sid:`${_et_supplier}`,
                      hp:1
                      }
                  ]
                  }
                }
              
            });

            try {
              pbjs.addAdUnits(window.ethb.getUnits());
            } catch (error) {
              console.log('Error adding ad units:', error);
            }

          pbjs.bidderSettings = {
            standard: {
              storageAllowed: true,
            },
          };

          if (window.ethb.getBidCpm() != 1.0) {
              pbjs.bidderSettings.adform = {
                bidCpmAdjustment: function (bidCpm, bid) {
                return bidCpm * window.ethb.getBidCpm();
                }
              };
          }

          // console.log(window.ethb.getBidCpm());
          pbjs.requestBids({
            timeout: atimeout,
            bidsBackHandler: function (e, n) {
              window.ethb.response(e, n);
            },
          });
        });
      //}
      /*
      // Add the event listener for DOMContentLoaded
      document.addEventListener('DOMContentLoaded', initializePrebid, { once: true });

      // Check if the DOM is already loaded
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initializePrebid();
      }
      */
    }

     buildWithoutTCF(without, cnt) {
         /*var atimeout = this.getKeyProperty(ref,'adapterTimeout');*/
      var atimeout = 1000;
      if (!atimeout) {
        atimeout = 2500;
      }
      if (!cnt) {
        cnt = 0;
      } else {
        this.logDebug("buildWithoutTCF", "is tcf loaded?", typeof __tcfapi);
      }
        
      if (!without) {
        var ts = parseInt(Math.random() * 1000000);
        var date = new Date();
        ts = date.getYear() + "" + date.getMonth() + "" + date.getDate();

        if (!this.gdprApiLoaded) {
          this.logDebug("buildWithoutTCF", "add tcfapi", this.gdprApiLoaded);
          var scrpt = document.createElement("script");
          scrpt.src =
            "https://sk.search.etargetnet.com/gdpr/gdpr.js.php?ecmp=3&apionly=1&t=" +
            ts;
          scrpt.async = true;
          window.self.document.body.appendChild(scrpt);
          this.gdprApiLoaded = true;
        }

        setTimeout(function () {
          if (typeof __tcfapi == "function") {
            if (cnt > 0) {
              setTimeout(function () {
                window.ethb.buildWithTCF();
              }, 100);
            } else {
              window.ethb.buildWithTCF();
            }
          } else {
            if (cnt > 10) {
              window.ethb.buildWithoutTCF(true);
            } else {
              window.ethb.buildWithoutTCF(false, ++cnt);
            }
          }
        }, 100);
      } else {
        var consent = this.hbGetCookie("euconsent-v2");

        window.ethb.date_request = new Date();

        var withoutSettings = {};
        if (this.getProperty("hbjsdebug")) {
          withoutSettings.debugging = {
            enabled: true,
          };
        }

        if (consent.length > 10) {
          window.ethb.gdpr = 2;
          withoutSettings.consentManagement = {
            gdpr: {
              cmpApi: "static",
              consentData: {
                getTCData: {
                  tcString: "" + consent + "",
                  gdprApplies: true,
                },
              },
              timeout: 10000
            },
             currency: {
                adServerCurrency: "EUR",
                defaultRates: { "USD": { "EUR": 1.09 }}
            },
              schain: {
                validation: "strict",
                config: {
                ver: "1.0",
                complete: 1,
                nodes: [
                    {
                    asi:"etarget.sk",
                    sid:`${_et_supplier}`,
                    hp:1
                    }
                ]
              }
            }
          };
        } else {
          window.ethb.gdpr = 3;
            withoutSettings = {
              enableTIDs: true,
                userSync: {
                userIds: [{
                  name: 'teadsId',
                  params: {
                      pubId: 27884
                  },
                  bidders: ['teads'],
                  storage: {
                    type: "cookie&html5",
                    name: "_teadsId",
                    expires: 365
                  }
                }, {
                  name: 'sharedId',
                  storage: {
                    type: "cookie",
                    name: "_sharedID",
                    expires: 30
                  }
                }]
            },
               currency: {
                adServerCurrency: "EUR",
                defaultRates: { "USD": { "EUR": 1.09 }}
            },
            schain: {
              validation: "strict",
              config: {
              ver: "1.0",
              complete: 1,
              nodes: [
                  {
                  asi:"etarget.sk",
                  sid:`${_et_supplier}`,
                  hp:1
                  }
              ]
            }
          }
          }
        }
          
        //console.log('woTC');
        pbjs.que.push(function () {
          pbjs.setConfig(withoutSettings);
          pbjs.addAdUnits(window.ethb.getUnits());

          pbjs.bidderSettings = {
            standard: {
              storageAllowed: true,
            },
          };

          if (window.ethb.getBidCpm() != 1.0) {
              pbjs.bidderSettings.adform = {
                bidCpmAdjustment: function (bidCpm, bid) {
                return bidCpm * window.ethb.getBidCpm();
                }
              };
          }

            
          pbjs.requestBids({
            timeout: atimeout,
            bidsBackHandler: function (e, n) {
              window.ethb.response(e, n);
            },
          });
        });
      }
    }

    response(e, n, ref) {
      this.date_end = new Date();

      this.setProperty("response", e, ref);

      this.parseResponse(e, ref);
    }

    parseResponse(e, ref) {
      var byMaxCmp = pbjs.getHighestCpmBids();
      var allBidders = this.getProperty("codeid");
      var sortedBids = [];
        // console.log(allBidders)
      if ((allBidders == undefined && byMaxCmp.length == 0) || (allBidders == "undefined" && byMaxCmp.length == 0)) {
        this.sendNoBids();
      }

      this.logDebug("parseResponse", e, allBidders, byMaxCmp);

      this.getAudienceCode(e);

      for (var k in byMaxCmp) {
        var bid = byMaxCmp[k];
        let codeID = bid.adUnitCode;

        sortedBids[codeID] = bid;
      }

      if (!ref) {
        for (var ref in allBidders) {
          let codeID = allBidders[ref];
          let res = sortedBids[codeID];

          this.createResponseWrapper(ref);

          this.chooseFallback(ref, res);
        }
      } else {
        let codeID = allBidders[ref];
        let res = sortedBids[codeID];

        this.createResponseWrapper(ref);

        this.chooseFallback(ref, res);
      }
    }

    getAudienceCode(data) {
      this.logDebug("getAudienceCode", data);

      for (var k in data) {
        var codeID = k;
        var d = data[codeID];
        if (typeof d == "object" && d) {
          if (typeof d.bids == "object" && d.bids) {
            for (var x in d.bids) {
              var bid = d.bids[x];
              if (typeof bid == "object" && bid) {
                var biddercode = bid.bidderCode;
                if (typeof bid.ad == "string" && biddercode == "etarget") {
                  var ad = bid.ad;
                  var s = ad.match(
                    /<script.id=.hbAudience.>([^<>]+)<\/script>/
                  );
                  if (typeof s == "object" && s) {
                    var aud = s[1];
                    if (typeof aud == "string" && aud) {
                      var allaud = window.ethb.getProperty("audience");
                      if (typeof allaud == "object" && allaud) {
                        if (allaud.indexOf(aud) < 0) {
                          allaud.push(aud);
                          window.ethb.setProperty("audience", newaud);
                        }
                      } else {
                        var newaud = [];
                        newaud.push(aud);
                        window.ethb.setProperty("audience", newaud);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    fallback(ref, res) {
      var fallback = this.getKeyProperty(ref, "globalFallback");

      this.logDebug("fallback", ref, encodeURIComponent(fallback));
        
      if (fallback.length > 0) {
        var scrpt = document.createElement("script");
        scrpt.innerHTML =
          "try{" + fallback + ";}catch(e){window.ethb.logError('fallback',e);}";
        document.body.appendChild(scrpt);

        var winner = "etargetfallback";
        if (
          fallback.indexOf("googletag") > -1 ||
          fallback.indexOf("gtg") > -1 ||
          fallback.indexOf("div-gpt") > -1
        ) {
          winner = "googlefallback";
        }

        this.setWinner(ref, winner);
      } else {
        this.etarget(ref, res, true);
      }
    }

    etarget(ref, res, fromFallback) {
      this.logDebug("etarget", ref, res);

      var domain = this.getKeyProperty(ref, "domain");
      var iframe = this.getKeyProperty(ref, "iframe");
      var flag = this.getKeyProperty(ref, "systemBlockFlag");
      var sizes = this.getKeyProperty(ref, "size");

      if (typeof res == "object" && res.cpm > 0) {
        this.logDebug("etarget", "last chance");

        this.show(ref, res);
        return;
      }

      if (iframe && typeof flag == "object" && flag.ppc === 0) {
        this.setSize(ref, sizes[0], sizes[1]);

        var loc = document.location.href;
        var src =
          "https://" +
          domain +
          ".search.etargetnet.com/generic/iframe.php?ref=" +
          ref +
          "&fromhb=1&area=" +
          sizes[0] +
          "x" +
          sizes[1] +
          "&referer=" +
          loc +
          "&sppos=3&replaceTo=uni&tabl=4&no_pixel=1";
        iframe.src = src;

        this.setWinner(ref, "etargetfallback");
      } else {
        if (!fromFallback) this.fallback(ref);
      }
    }

    show(ref, res) {
      this.logDebug("show", res);

      var iframe = this.getKeyProperty(ref, "iframe");
      var div = this.getKeyProperty(ref, "wrapper");

      switch (res.mediaType) {
        case "video":
        case "banner":
          {
            if (
              (typeof res.url == "string" && res.url.length > 0) ||
              (typeof res.vasrUrl == "string" && res.vasrUrl.length > 0)
            ) {
              this.setSize(ref, res.width, res.height);

              var url = res.url || res.vasrUrl;
              iframe.src = url;
            } else {
              if (typeof res.ad == "string" && res.ad.length > 0) {
                if (
                  res.bidder == "teads" &&
                  typeof div == "object" &&
                  res.mediaType == "video"
                ) {
                  iframe.style.display = "none";
                  div.style.width = "100%";
                  div.style.height = "auto";

                  pbjs.renderAd(div, res.adId);
                } else {
                  this.setSize(ref, res.width, res.height);

                  var doc = iframe.contentWindow.document;
                  var html =
                    "<!DOCTYPE html><html><head><style>body{padding:0px;margin:0px;text-align:center;}</style></head><body></body></html>";

                  doc.open();
                  doc.write(html);

                  pbjs.renderAd(doc, res.adId);

                  doc.close();
                }
              } else {
                this.logError("show", "ERROR");
              }
            }
          }
          break;
        case "native":
          {
            this.setSize(ref, res.width, res.height, "native");

            this.showNativ(ref, res, doc, iframe);
          }
          break;
      }

      var winner = res.bidder;
      if (res.bidder == "etarget" && res.reason == "last chance") {
        winner = "etargetppc";
      }

      this.setWinner(ref, winner);

      this.placeAudience();
    }

    placeAudience() {
      var auds = this.getProperty("audience");

      this.logDebug("placeAudience", auds);

      try {
        if (typeof auds == "object" && auds) {
          for (var k in auds) {
            var aud = auds[k];
            this.logDebug("placeAudience code", aud);
            if (typeof aud == "string" && aud && aud.length > 0) {
              eval(aud);
            }
          }
        }
      } catch (e) {
        this.logDebug("placeAudience err", e);
      }
    }

    showNativ(ref, res, doc, iframe) {
      var nObj = res.native;

      var clickUrl = nObj.clickUrl;
      var imgSrc = nObj.image && nObj.image.url;

      var wrap = document.createElement("div");
      wrap.className = "wrap";
      wrap.id = "ethb_native_wrape";
      var title = document.createElement("header");
      title.className = "title";
      var body = document.createElement("div");
      body.className = "body";
      var image = document.createElement("img");
      var sponsored = false;

      title.innerHTML = nObj.title;

      body.innerHTML = nObj.body;
      if (typeof nObj.sponsoredBy == "string") {
        sponsored = document.createElement("div");
        sponsored.innerHTML = nObj.sponsoredBy;
        sponsored.className = "sponsored";
      }

      var style = document.createElement("style");
      var styling = this.getKeyProperty(ref, "refstyling");
      if (typeof styling == "object") {
        style.innerHTML =
          style.innerHTML +
          "#ethb_native_wrape{cursor:pointer;font-family:" +
          styling.font +
          "; font-size:" +
          styling.fsi +
          "; background-color:" +
          styling.bg +
          "; width:100%: height:auto;}";
        style.innerHTML =
          style.innerHTML +
          "#ethb_native_wrape .title{color:" +
          styling.title.color +
          "}";
        style.innerHTML =
          style.innerHTML +
          "#ethb_native_wrape .title:hover{color:" +
          styling.title.hcolor +
          "}";
        style.innerHTML =
          style.innerHTML +
          "#ethb_native_wrape .body{color:" +
          styling.text.color +
          "}";
        style.innerHTML =
          style.innerHTML +
          "#ethb_native_wrape .body:hover{color:" +
          styling.text.hcolor +
          "}";
      }

      wrap.setAttribute("onclick", 'window.open("' + clickUrl + '")');
      wrap.style.cssText =
        "display:block;width:100%;height:100%;text-decoration:none;";
      title.style.cssText = "font-size:120%;font-weight:bold;padding:4px 2px;";
      body.style.cssText = "padding:4px 2px;";

      if (imgSrc) {
        image.src = imgSrc;
        wrap.appendChild(image);
      } else {
        try {
          var cont = document.getElementsByClassName("_et_hb_cont");
          if (cont.length > 0) {
            var foot = cont[0].getElementsByClassName("footer");
            if (foot.length > 0) {
              foot[0].style.display = "none";
            }
          }
        } catch (e) {
          this.logError("showNative", ref, e);
        }
      }
      wrap.appendChild(style);
      wrap.appendChild(title);
      wrap.appendChild(body);
      if (sponsored) {
        wrap.appendChild(sponsored);
      }

      var wrapper = this.getKeyProperty(ref, "wrapper");
      wrapper.appendChild(wrap);

      var impTrackers = nObj.impressionTrackers || [];
      var jsTrackers = this.parseJsTrackers(nObj.javascriptTrackers) || [];
      var clickTrackers = nObj.clickTrackers;

      for (var i = 0; i < impTrackers.length; i++) {
        this.fireRequest(impTrackers[i]);
      }

      for (var i = 0; i < jsTrackers.length; i++) {
        var scr = document.createElement("script");
        scr.type = "text/javascript";
        scr.async = true;
        scr.src = jsTrackers[i];
        wrapper.insertBefore(scr, wrapper.firstChild);
      }

      var clickable = Array.prototype.slice.apply(wrapper);

      for (var i = 0; i < clickable.length; i++) {
        clickable[i].addEventListener("click", function () {
          for (var j = 0; j < clickTrackers.length; j++) {
            this.fireRequest(clickTrackers[j]);
          }
        });
      }
    }

    setWinner(ref, winner) {
      var adapters = this.adapters[ref];
      var res = this.getProperty("response") || {};

        var refres = res[this.getKeyProperty(ref, "codeid")];
    //     console.log("----")
    //   console.log(adapters)
        
    //     console.log("----")
    //     console.log(typeof(refres))
    //     console.log(refres)
    //     console.log("----")
        let time = Math.floor(Date.now());
        var data = {};
      let bidderWithId;
      if (typeof adapters == "object") {
        for (var k in adapters) {
          if (adapters[k].bidder == "adform") {
            if (adapters[k].params.mid != undefined) {
              bidderWithId =
                adapters[k].bidder + "-mid-" + adapters[k].params.mid;
            } else if (adapters[k].params.inv != undefined) {
              bidderWithId =
                adapters[k].bidder + "-inv-" + adapters[k].params.inv;
            } else if (adapters[k].params.mname != undefined) {
              bidderWithId =
                adapters[k].bidder + "-mname-" + adapters[k].params.mname;
            } else if (adapters[k].params.adxDomain != undefined) {
              bidderWithId =
                adapters[k].bidder + "-adxD-" + adapters[k].params.adxDomain;
            } else {
              bidderWithId = adapters[k].bidder;
            }
          } else {
            bidderWithId = adapters[k].bidder;
          }
          data[bidderWithId] = 0;
        }
        }
        // console.log("----")
        
        // console.log(data)
        // console.log("----")
        
        var winners = pbjs.getAllWinningBids();
        var trueWinners = {}
        // console.log(winners)
        let bidWinner;
        winners.forEach(elem => {
            if (elem.bidder == "adform") {
                bidWinner = elem.bidder;
                // console.log(bidWinner)
                // console.log(elem)
            }
            else {
                bidWinner = elem.bidder;
            }
            trueWinners[bidWinner] = elem.cpm + ' and OCPM: ' + elem.originalCpm
        })
        
        // console.log("----")
        
        // console.log(trueWinners)
        // console.log("----")

      if (typeof refres == "object") {
      
          var rr = refres.bids;
        //   console.log(rr);
          var cnt = 0;
        for (var k in rr) {
          var bid = rr[k];
          if (bid.bidder == "adform") {
              cnt += 1;
              bidderWithId = bid.bidder + '-' + cnt;
          }
          else {
            bidderWithId = bid.bidder;
          }
          data[bidderWithId] = bid.cpm;

          
          data["winnerInfo"] = {
            cpm: bid.cpm,
            exchange: bidderWithId,
            original_cpm: bid.originalCpm,
            currency: bid.currency,
            size: bid.size,
            media_type: bid.mediaType,
            rendered: !!winners.find(function (win) {
              return win.adId == bid.adId;
            }),
          };
        }
      }
        // console.log("----")
      
        // console.log("DATA:")
        // console.log(data)
        // console.log("____")
      if (winner.indexOf("fallback") > 0) {
        var cpm = this.getKeyProperty(ref, "globalFallbackPrice");
        if (winner == "googlefallback") {
          winner = "google";
        }
        data[winner] = cpm;
      }
        time = time - this.timestamp
        // console.log(time)
      this.logDebug("setWinner", ref, winner);

      this.setKeyProperty("winner", ref, winner);

      this.sendWinner(ref, data, winner, trueWinners, time);
    }

    sendWinner(ref, data, winner, true_winners = {}, time_milis = 0) {
      var args = {};
      args.ref = ref;
      args.winner = winner;
      args.data = this.getKeyProperty(
        this.getKeyProperty(ref, "codeid"),
        "response"
      );

      try {
        window.ethb.showEvent("bidWonData", args, ref);

        var domain = this.getKeyProperty(ref, "domain");
        var pos = this.getFold(ref);
        var gdpr = window.ethb.gdpr || 0;
        var ua = navigator.userAgent;
        var data = JSON.stringify(data);
        true_winners = JSON.stringify(true_winners);    
        var version = "1.9";
          var url =
              "https://" +
              domain +
              ".search.etargetnet.com/generic/header_bidding_log.php?ref=" +
              ref +
              "&gdpr=" +
              gdpr +
              "&position=" +
              pos +
              "&data=" +
              data +
              "&ua=" +
              ua +
              "&referer=" +
              ref +
              "&winner=" +
              winner +
              "&version=" + version + "&true_winners=" + true_winners + "&time_milis=" + time_milis; 
        
        this.ajaxcallX(url, null, true);
      } catch (e) {
        this.logError("sendWinner", ref, e);
      }
    }

    forEachElem(responses, cb) {
      Object.keys(responses).forEach(function (adUnitCode) {
        var response = responses[adUnitCode];
        response.bids.forEach(function (bid) {
          cb(adUnitCode, bid);
        });
      });
    }

    sendNoBids() {
      let data = {};
      let output = [];
      this.forEachElem(
        (pbjs.getNoBids()) || {},
        function (code, bid) {
          output.push({
            msg: "no bid",
            adunit: code,
            referer: parseInt(code.split("-")[2]),
            adId: bid.bidId,
            bidder: bid.bidder,
            params: bid.bidder == "adform" ? bid.params.mid : 1,
          });
        }
      );
      let refer = 0;
      let bidderWithId;
      output.forEach((elem) => {
        if (elem.bidder == "adform") {
          bidderWithId = elem.bidder + "-" + elem.params;
        } else {
          bidderWithId = elem.bidder;
        }
        data[bidderWithId] = 0;
        refer = elem.referer;
      });

    //   console.log(data);
      let domain = this.getKeyProperty(refer, "domain");
      let pos = this.getFold(refer);
      let gdpr = window.ethb.gdpr || 0;
      let ua = navigator.userAgent;
      let winner = "no winner";
      var version = "1.9";
      data = JSON.stringify(data);
    //   console.log("----");
    //   console.log(refer);
    //   console.log(domain);
    //   console.log(pos);
    //   console.log(gdpr);
    //   console.log(ua);
      let true_winners = {};
      true_winners = JSON.stringify(true_winners);
      var url =
        "https://" +
        domain +
        ".search.etargetnet.com/generic/header_bidding_log.php?ref=" +
        refer +
        "&gdpr=" +
        gdpr +
        "&position=" +
        pos +
        "&data=" +
        data +
        "&ua=" +
        ua +
        "&referer=" +
        refer +
        "&winner=" +
        winner +
        "&version=" +
        version + "&true_winners=" + true_winners; 

      this.ajaxcallX(url, null, true);
    }

    ajaxcallX(src, callback, noperm) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          if (typeof callback == "function" && callback != null) {
            callback(xhr);
          }
        }
      };
      xhr.open("GET", src, true);
      if (!noperm) {
        xhr.withCredentials = true;
      }
      xhr.send(null);
      return true;
    }

    fireRequest(url) {
      var request = new XMLHttpRequest();
      request.open("GET", url);
      request.send();
    }

    parseJsTrackers(str) {
      str = str.replace(/\"/gi, "°");

      var urls = [],
        regex = new RegExp("(?:data-)?src=°([^°]*)°", "g"),
        result;
      var i = 0;
      try {
        while ((result = regex.exec(str)) !== null) {
          urls.push(result[1]);
          i++;
          if (i > 20) {
            break;
          }
        }
      } catch (e) {
        this.logError("parseJsTrackers", e);
      }

      return urls;
    }

    setSize(ref, w, h, type) {
      var iframe = this.getKeyProperty(ref, "iframe");
      var div = this.getKeyProperty(ref, "wrapper");
      var cont = div.querySelector("._et_hb_cont");

      if (typeof w == "string" && w.indexOf("px") > 0) {
        w = w.replace("px", "");
      }
      if (typeof h == "string" && h.indexOf("px") > 0) {
        h = h.replace("px", "");
      }

      var w2 = w;
      var h2 = h;

      if (w == 0 && h == 0 && (type == "native" || type == "responsive")) {
        w = "100%";
        h = "auto";
        w2 = "0px";
        h2 = "0px";
      } else {
        w = w + "px";
        h = h + "px";
        w2 = w;
        h2 = h;
      }

      this.logDebug("setSize", w, h, w2, h2, type, iframe, div);

      iframe.style.width = w2;
      iframe.style.height = h2;

      div.style.width = w;
      div.style.height = h;

      cont.style.width = w;
      cont.style.height = h;
    }

    createResponseWrapper(ref) {
      var hbparent = this.getKeyProperty(ref, "wrapper");
      var cont = hbparent.getElementsByClassName("_et_hb_cont");

      this.logDebug("createResponseWrapper", ref, hbparent);

      if (cont.length > 0) {
        this.setSize(ref, 0, 0, "responsive");
        return false;
      }

      var div = document.createElement("div");
      var rand = parseInt(Math.random() * 10000);
      div.className = "_et_hb_cont contdiv _et_rand" + rand;
      div.style =
        "border:none;position:relative;text-align:center;margin:0px auto;height:0px;";

      /*TODO: footer*/

      var iframe = document.createElement("iframe");
      iframe.style = "width:0px;height:0px;border:none;margin:0px;";
      iframe.id = "etarget_hb_" + ref;
      iframe.name = "etarget_hb_" + ref;
      iframe.scrolling = "no";

      this.setKeyProperty("iframe", ref, iframe);

      div.appendChild(iframe);

      hbparent.appendChild(div);
    }

    chooseFallback(ref, res) {
      var noFallback = this.getKeyProperty(ref, "globalNoFallback");
      var fallbackType = this.getKeyProperty(ref, "globalFallbackType");

      if (!noFallback) {
        var fallback = this.getKeyProperty(ref, "globalFallback");
        if (fallback.length > 0 || fallbackType == "adsense") {
          noFallback = false;
        }

        if (
          !noFallback &&
          this.getKeyProperty(ref, "globalFallbackPrcEtarget") > 0 &&
          this.getKeyProperty(ref, "globalFallbackPrcAdsense") > 0
        ) {
          var sum =
            parseInt(this.getKeyProperty(ref, "globalFallbackPrcEtarget")) +
            parseInt(this.getKeyProperty(ref, "globalFallbackPrcAdsense"));
          var rand = 0;
          if (sum > 0) {
            rand = Math.random() * sum;
            noFallback = false;
            if (
              Math.ceil(rand) <=
              parseInt(this.getKeyProperty(ref, "globalFallbackPrcEtarget"))
            ) {
              fallbackType = "etarget";
            }
          }
          this.logDebug(
            "chooseFallback",
            "prc",
            ref,
            this.getKeyProperty(ref, "globalFallbackPrcEtarget"),
            this.getKeyProperty(ref, "globalFallbackPrcAdsense"),
            sum,
            rand
          );
        }
      }

      if (
        !noFallback &&
        this.getKeyProperty(ref, "globalFallbackPrice") > 0 &&
        typeof res == "object" &&
        res.cpm > 0
      ) {
        var charge = this.getKeyProperty(ref, "systemChargePerc")[
          this.extPair[res.bidder]
        ];
        var fallbackCPM = this.getKeyProperty(ref, "globalFallbackPrice");
        var fallbackFisrtCPM = this.getKeyProperty(
          ref,
          "globalFallbackPriceFirst"
        );
        var firstCNT = parseInt(
          this.hbGetCookie(
            "_et_hb_" + this.getKeyProperty(ref, "supplier") + "_ff"
          )
        );
        if (fallbackFisrtCPM > 0) {
          if (isNaN(firstCNT) || firstCNT <= 0) {
            fallbackCPM = fallbackFisrtCPM;
          }
        }
        if (charge > 0) {
          charge = parseFloat(charge);
          fallbackCPM = parseFloat(
            parseFloat(res.cpm * (1 - charge)).toFixed(3)
          );
        }
        this.logDebug(
          "chooseFallback",
          "cpm",
          ref,
          this.getKeyProperty(ref, "globalFallbackPrice"),
          this.getKeyProperty(ref, "globalFallbackPriceFirst"),
          firstCNT,
          fallbackCPM,
          charge,
          res.cpm,
          res.bidder
        );
        if (fallbackCPM < res.cpm) {
          noFallback = true;
          fallbackType = "etarget";
        }
      }

      this.logDebug("chooseFallback", "type", ref, noFallback, fallbackType);

      if (!noFallback) {
        switch (fallbackType) {
          case "google":
          case "adsense":
            {
              try {
                this.showADXFromScript(ref);
              } catch (e) {
                this.logError("chooseFallback", ref, e);
              }
            }
            break;
          case "etarget":
          case "script":
            {
              this.fallback(ref, res);
            }
            break;
        }
      } else {
        this.etarget(ref, res);
      }
    }

    isFirefox() {
      return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    }

    showADXFromScript(ref) {
      var sizes = this.getKeyProperty(ref, "size");
      var width = sizes[0];
      var height = sizes[1];

      this.logDebug(
        "showADXFromScript",
        ref,
        sizes,
        !!document.getElementById(
          "google_ads_iframe_/77283581/Large_Leaderboard_0"
        )
      );

      var myself = this.getKeyProperty(ref, "wrapper");
      if (
        !!document.getElementById(
          "google_ads_iframe_/77283581/Large_Leaderboard_0"
        )
      ) {
        const eleReplace = myself;
        eleReplace.parentNode.removeChild(eleReplace);
      } else {
        var pubID = this.getKeyProperty(ref, "globalFallbackPubID");
        if (pubID.indexOf("ca-pub") === -1) {
          pubID = "ca-pub-" + pubID;
        }
        var slotID = this.getKeyProperty(ref, "globalFallbackSlotID");
        this.logDebug("showADXFromScript", ref, "data", pubID, slotID);
        this.logDebug("showADXFromScript", ref, "myself", myself);
        const gFallback = document.createElement("div");
        gFallback.className = "banner ads";
        const first = document.createElement("script");
        first.async = true;

        var cc = this.getKeyProperty(ref, "domain");
        // if (cc === 'bg' && ref === '87381') {
          first.src =
            "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + pubID;
          first.setAttribute('crossorigin', 'anonymous');
          gFallback.appendChild(first);
          const ins = document.createElement("ins");
          ins.className = "adsbygoogle";
          ins.setAttribute("data-ad-client", pubID);
          ins.setAttribute("data-ad-slot", slotID);
          ins.style.cssText = "display:block;margin-bottom:12px;";
          if (width > 0 && height > 0) {
            ins.style.width = width + "px";
            ins.style.height = height + "px";
          }
          gFallback.appendChild(ins);
          const second = document.createElement("script");
          const secondCode = "(adsbygoogle = window.adsbygoogle || []).push({});";
          second.appendChild(document.createTextNode(secondCode));
          gFallback.appendChild(second);
          myself.appendChild(gFallback);
          /*
          if (this.isFirefox()) {
            googletag.pubads().refresh();
          };
          function allSlotsRendered(slots) {
            return slots.every(s => s.hasOwnProperty('_rendered'));
          }
          
          if (googletag && googletag.pubads) {
            var gamSlots = googletag.pubads().getSlots();
            var renderedSlots = 0;

            googletag.pubads().addEventListener('slotRenderEnded', function(e) {
              renderedSlots++;
              if (renderedSlots === gamSlots.length || allSlotsRendered(gamSlots)) {
                myself.appendChild(gFallback);
              }
            });
          }

        } else {
          first.src =
            "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
          gFallback.appendChild(first);
          const ins = document.createElement("ins");
          ins.className = "adsbygoogle";
          ins.style.cssText = "display:block;margin-bottom:12px;";
          if (width > 0 && height > 0) {
            ins.style.width = width + "px";
            ins.style.height = height + "px";
          }
          ins.setAttribute("data-ad-name", "adx");
          ins.setAttribute("data-ad-client", pubID);
          ins.setAttribute("data-ad-slot", slotID);
          gFallback.appendChild(ins);
          const second = document.createElement("script");
          const secondCode = "(adsbygoogle = window.adsbygoogle || []).push({});";
          second.appendChild(document.createTextNode(secondCode));
          gFallback.appendChild(second);
          myself.appendChild(gFallback);
        }*/
      }

      this.setWinner(ref, "googlefallback");
    }

      loadPrebid() {
          
      window.self.pbjs = window.self.pbjs || {};
      window.self.pbjs.que = window.self.pbjs.que || [];
      window.self.pbjs.logging = true;
      
      /*
      window.self.googletag = window.self.googletag || {};
      window.self.googletag.cmd = window.self.googletag.cmd || [];

      window.self.googletag.cmd.push(function () {
        window.self.googletag.pubads().disableInitialLoad();
      });
      */
      var pscr = document.createElement("script");
      
      //var pbjs_version = "7.34.0";
      var pbjs_version = "9.30.0";
      pscr.src = "https://etargetcdn.com/hb/prebid" + pbjs_version + ".js";
      window.self.document.head.appendChild(pscr);
    }

    hbGetCookie(name) {
      var match = false;
      try {
        match = window.top.document.cookie.match(
          new RegExp("(^| )" + name + "=([^;]+)")
        );
      } catch (e) {}
      if (!match) {
        match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
      }
      this.logDebug("hbGetCookie", name, match);
      if (match) return match[2];
      return "";
    }

    hbSetCookie(name, val, exp) {
      if (!exp) {
        exp = 24;
      }
      if (isNaN(val)) {
        val = 0;
      }
      var d = new Date();
      d.setTime(d.getTime() + exp * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = name + "=" + val + "; " + expires + "; path=/";
      this.logDebug("hbSetCookie", name, val, exp);
    }

    addEvent() {
      var args = arguments[0];
      var ref = args[0];
      var name = args[1];
      var event = args[2];

      if (typeof name == "object") {
        for (var k in name) {
          if (typeof name[k] == "object" && name[k] != null) {
            for (var x in name[k]) {
              this.addEvent([ref, k, name[k][x]]);
            }
          } else {
            if (typeof name[k] == "string" && name[k].length > 0) {
              this.addEvent([ref, k, name[k]]);
            }
          }
        }
        return;
      }

      this.logDebug("addEvent", ref, name, event);

      var events = this.getKeyProperty(ref, "globalEvents");
      if (typeof events == "object") {
        if (typeof events[name] != "object") {
          events[name] = [];
        }
      } else {
        events = {};
        events[name] = [];
      }
      events[name].push(event);

      this.setKeyProperty("globalEvents", ref, events);
    }

    showEvent(ev, args, oref) {
      var events = this.getProperty("globalEvents");

      if (!events) {
        return false;
      }

      if (typeof oref != "undefined" && parseInt(oref) > 0) {
        if (typeof events[oref] == "object") {
          if (typeof events[oref][ev] == "object") {
            for (var k in events[oref][ev]) {
              if (events[oref][ev][k]) {
                this.logDebug(
                  "showEvent",
                  "oref",
                  encodeURIComponent(events[oref][ev][k])
                );
                this.doEval(events[oref][ev][k], args);
              }
            }
          }
        }
      }

      for (var ref in events) {
        if ((window.ethb.adapters[ref] && !oref) || ref == "0") {
          var refevents = events[ref];
          if (typeof refevents == "object") {
            if (refevents[ev]) {
              var refevent = refevents[ev];
              for (var k in refevent) {
                if (refevent[k]) {
                  this.logDebug(
                    "showEvent",
                    "eval",
                    encodeURIComponent(refevent[k])
                  );
                  this.doEval(refevent[k], args);
                }
              }
            }
          }
        }
      }
    }

    doEval(seval, args) {
      try {
        eval(seval);
      } catch (e) {
        this.logError("doEval", e);
      }
    }

    setPrebid() {
      if (!this.date_start) {
        this.loadPrebid();

        this.date_start = new Date();

        pbjs.que.push(function () {
          pbjs.onEvent("beforeRequestBids", function (args) {
            window.ethb.showEvent("beforeRequestBids", args);
          });
          pbjs.onEvent("bidRequested", function (args) {
            window.ethb.showEvent("bidRequested", args);
          });
          pbjs.onEvent("bidResponse", function (args) {
            window.ethb.showEvent("bidResponse", args);
          });
          pbjs.onEvent("bidWon", function (args) {
            window.ethb.showEvent("bidWon", args);
          });
          pbjs.onEvent("auctionInit", function (args) {
            window.ethb.showEvent("auctionInit", args);
          });
          pbjs.onEvent("auctionEnd", function (args) {
            window.ethb.showEvent("auctionEnd", args);
          });
          pbjs.onEvent("bidAdjustment", function (args) {
            window.ethb.showEvent("bidAdjustment", args);
          });
          pbjs.onEvent("bidderDone", function (args) {
            window.ethb.showEvent("bidderDone", args);
          });
          pbjs.onEvent("auctionDebug", function (args) {
            window.ethb.showEvent("auctionDebug", args);
          });
        });

        setTimeout(function () {
          window.ethb.build();
        }, 1000);
      }
    }

    build() {
      if (typeof __tcfapi == "function") {
        window.ethb.buildWithTCF();
      } else {
        window.ethb.buildWithoutTCF();
      }
    }

    rePush() {
      window.ethb.execQue(arguments[0]);
    }

    copyQueue(obj) {
      this.logDebug("copyQueue", "start", obj);

      if (obj) {
        for (var k in obj) {
          if (typeof obj[k] == "object" || typeof obj[k] == "function") {
            this.execQue(obj[k]);
          }
        }
      }
    }

    execQue(obj) {
      this.logDebug("execQue", "start", obj);

      if (typeof obj == "function") {
        obj.call(this);
      } else {
        for (var k in obj) {
          if (typeof this[k] == "function") {
            for (var x in obj[k]) {
              this[k].call(this, obj[k][x]);
            }
          }
        }
      }
    }

    getMediaTypes(ref, size) {
      var mts = this.getKeyProperty(ref, "mediatypes");
      var mediatypes = {};
      for (var k in mts) {
        var type = mts[k];
        switch (type) {
          case "banner":
            {
              mediatypes.banner = {
                sizes: size,
              };
            }
            break;
          case "native":
            {
              mediatypes.native = {
                title: {
                  required: true,
                  sendId: true,
                },
                body: {
                  required: true,
                  sendId: true,
                },
                clickUrl: {
                  sendId: true,
                },
              };
            }
            break;
        }
      }

      return mediatypes;
    }
    

    setbidCpm(bidCpm) {
      this.newBidCpm = bidCpm;
    }

    getBidCpm() {
      return this.newBidCpm;
    }

    mergeUniqueArrays(arr1, arr2) {
      const seen = new Set(arr1.map(JSON.stringify));
      arr2.forEach(item => {
        const key = JSON.stringify(item);
        if (!seen.has(key)) {
          arr1.push(item);
          seen.add(key);
        }
      });
      return arr1;
    }

    isNumeric(arr) {
      if (Array.isArray(arr[0])) {
        return typeof arr[0][0] === 'number' && !isNaN(arr[0][0]);
      }
      return typeof arr[0] === 'number' && !isNaN(arr[0]);
      // return arr.every(innerArray => 
      //   Array.isArray(innerArray) && innerArray.every(item => typeof item === 'number' && !isNaN(item))
      // );
    }

    getUnits() {
      const units = [];
      this.adapters.forEach((adapter, ref) => {
        const addUnit = {};
        addUnit.code = "etarget-id-" + ref;
        addUnit.bids = [];
        addUnit.mediaTypes = addUnit.mediaTypes || {};
        addUnit.mediaTypes.banner = addUnit.mediaTypes.banner || {};
        addUnit.mediaTypes.banner.sizes = addUnit.mediaTypes.banner.sizes || [];

        adapter.forEach((elem) => {
          addUnit.bids.push(elem);
          let sizesAdd;
          let mediatypes;

          if (elem.sizeConfig) {
            sizesAdd = elem.sizeConfig[0].sizes;
            if (this.isNumeric(sizesAdd)) {
              mediatypes = this.getMediaTypes(ref, sizesAdd);
            }
          } else {
            sizesAdd = this.sizes ? this.sizes[ref] : [];
            mediatypes = this.getMediaTypes(ref, sizesAdd);
          }

          if (mediatypes && mediatypes.banner && mediatypes.banner.sizes) {
            addUnit.mediaTypes.banner.sizes = this.mergeUniqueArrays(addUnit.mediaTypes.banner.sizes, mediatypes.banner.sizes);
          }

          if (mediatypes && mediatypes.native) {
            addUnit.mediaTypes.native = mediatypes.native;
          }
        });
        
        units.push(addUnit);
      });
      this.logDebug("adUnits", units);
      return units;
    }

    addAdapters(ref, obj) {
      this.logDebug("addAdapters", ref, obj);

      if (typeof this.adapters[ref] == "undefined") {
        this.adapters[ref] = [];
      }

      for (var k in obj) {
        if (typeof obj[k] == "object" && obj[k] != null) {
          if (typeof obj[k][0] == "object") {
            for (var x in obj[k]) {
              if (obj[k][x].active) {
                delete obj[k][x]["active"];
                this.adapters[ref].push(obj[k][x]);
              }
            }
          } else {
            if (obj[k].active) {
              delete obj[k]["active"];
              this.adapters[ref].push(obj[k]);
            }
          }
        }
      }
    }

    addSizes(ref, obj) {
      this.logDebug("addSizes", ref, obj);

      if (typeof this.sizes[ref] == "undefined") {
        this.sizes[ref] = [];
      }
      for (var k in obj) {
        let size = obj[k];
        if (typeof size == "string") {
          size = size.split("x");
        }
        if (parseInt(size[0]) > 0 && parseInt(size[1]) > 0) {
          size = [parseInt(size[0]), parseInt(size[1])];
          if (this.sizes[ref].join(".").indexOf(size) == -1) {
            this.sizes[ref].push(size);
          }
        }
      }
    }

    setKeyProperty() {
      var args = arguments;
      if (typeof args[0] == "object") {
        args = args[0];
      }

      if (typeof this["variables"][args[0]] == "undefined") {
        this["variables"][args[0]] = [];
      }
      if (typeof this["variables"][args[0]][args[1]] == "undefined") {
        this["variables"][args[0]][args[1]] = [];
      }
      this["variables"][args[0]][args[1]] = args[2];
    }

    addKeyProperty() {
      var args = arguments[0];

      if (typeof this["variables"][args[0]] == "undefined") {
        this["variables"][args[0]] = [];
      }
      if (typeof this["variables"][args[0]][args[1]] == "undefined") {
        this["variables"][args[0]][args[1]] = [];
      }
      this["variables"][args[0]][args[1]].push(args[2]);
    }

    setProperty() {
      var args = arguments;
      if (typeof args[0] == "object") {
        args = args[0];
      }

      if (typeof this["variables"][args[0]] == "undefined") {
        this["variables"][args[0]] = [];
      }
      this["variables"][args[0]] = args[1];
    }

    addProperty() {
      var args = arguments[0];

      if (typeof this["variables"][args[0]] == "undefined") {
        this["variables"][args[0]] = [];
      }
      this["variables"][args[0]].push(args[1]);
    }

    getProperty(name) {
      if (typeof this["variables"] == "object") {
        return this["variables"][name];
      }

      return false;
    }

    getKeyProperty(key, name) {
      if (
        typeof this["variables"][name] != "undefined" &&
        typeof this["variables"][name][key] != "undefined"
      ) {
        return this["variables"][name][key];
      }

      return false;
    }

    getWrapper(ref) {
      var parent =
        document.getElementById("etarget-id-" + ref) ||
        document.querySelectorAll(
          "[data-etarget-id=etarget-id-" + ref + "]"
        )[0];
      if (typeof parent == "undefined") {
        var url = "header_bidding.php?ref=" + ref;
        var url2 = "uni.php?ref=" + ref;
        var url3 = "uni.php?g=ref:" + ref;
        var scripts = document.getElementsByTagName("script");
        this.logDebug("getWrapper noparent");
        for (var k in scripts) {
          var script = scripts[k];
          if (typeof script == "object") {
            if (typeof script.src != "undefined") {
              var src = script.src;
              if (
                src.indexOf(url) > 0 ||
                src.indexOf(url2) > 0 ||
                src.indexOf(url3) > 0
              ) {
                var div = document.createElement("div");
                div.id = "etarget-id-" + ref;
                script.parentNode.insertBefore(div, script);
                parent = div;
                break;
              }
            }
          }
        }
      }
      return parent;
    }

    getFold(ref) {
      var fold = this.getKeyProperty(ref, "fold");
      if (!fold) {
        fold = this.inVisibleArea(ref) !== 1 ? "btf" : "atf";
        this.setKeyProperty(["fold", ref, fold]);
      }

      return fold;
    }

    inVisibleArea(obj) {
      if (typeof obj != "object" && obj.length > 0) {
        obj = this.getWrapper(obj);
      }

      try {
        var wtop = top;
        if (typeof top == "object") {
          if (
            top.length != 1 ||
            !top.length ||
            typeof top.length == "undefined"
          ) {
            wtop = window;
          }
        }
        var ww = wtop.innerWidth;
        var wh = wtop.innerHeight;
        var vw = wtop.innerWidth;
        var vh = wtop.innerHeight;
        var visiblePart = 50;

        vw = obj.clientWidth;
        vh = Math.max(obj.clientHeight, 1);

        var vr = vw * vh;
        var vpl = this.findLeft(obj);
        var vpt = this.findTop(obj);
        var viewabilityState = 0;

        if (vpl && vpt && ww > 0) {
          var vpw = this.findLeft(obj);
          var vph = this.findTop(obj);
          var dst = top.scrollY;
          var dsl = top.scrollX;

          var difw = vpw - dsl;
          var difh = vph - dst;
          var difw2 = ww + dsl - vpw - vw;
          var difh2 = wh + dst - vph - vh;

          var resw = vw;
          var resh = vh;

          if (difw < 0) {
            resw = resw + difw;
          }
          if (difw2 < 0) {
            resw = resw + difw2;
          }
          if (difh < 0) {
            resh = resh + difh;
          }
          if (difh2 < 0) {
            resh = resh + difh2;
          }

          var vnr = resw * resh;
          var prc = parseInt((vnr / vr) * 100);

          if (prc >= visiblePart) {
            viewabilityState = 1;
          }
        } else {
          viewabilityState = 2;
        }
        return viewabilityState;
      } catch (e) {
        return 0;
      }
    }

    findTop(obj) {
      if (!obj) return 0;
      return obj.offsetTop + this.findTop(obj.offsetParent);
    }

    findLeft(obj) {
      if (!obj) return 0;
      return obj.offsetLeft + this.findLeft(obj.offsetParent);
    }

    logDebug() {
      if (
        window.location.href.indexOf("hbjsdebug") > 0 ||
        this.getProperty("hbjsdebug")
      ) {
        console.log(
          "%c Etarget %c HB ",
          "background:#4e0060;color:white",
          "background:#1ba9e1;color:white",
          arguments
        );
      }
    }

    logError() {
      if (
        window.location.href.indexOf("hbjsdebug") > 0 ||
        this.getProperty("hbjsdebug")
      ) {
        console.log(
          "%c Etarget %c HB ",
          "background:#ff0000;color:white",
          "background:#1ba9e1;color:white",
          arguments
        );
      }
    }
  }

  if (typeof window.ethb == "object") {
    if (typeof window.ethb.que == "object") {
      var cq = window.ethb.que;
    }
  }
  window.ethb = new ethb();
  window.ethb.copyQueue(cq);
}
