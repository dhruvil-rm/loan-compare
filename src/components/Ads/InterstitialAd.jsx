import React, { useEffect, useRef, useState } from "react";

let gptServicesEnabled = false;

const InterstitialAd = ({ adUnitPath, onLoaded }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const slotRef = useRef(null);
  const onLoadedRef = useRef(onLoaded);

  useEffect(() => {
    onLoadedRef.current = onLoaded;
  }, [onLoaded]);

  useEffect(() => {
    window.googletag = window.googletag || { cmd: [] };
    const { googletag } = window;

    const handleSlotOnload = (event) => {
      if (slotRef.current === event.slot) {
        setIsLoaded(true);
        if (onLoadedRef.current) onLoadedRef.current();
      }
    };

    googletag.cmd.push(() => {
      const interstitialSlot = googletag.defineOutOfPageSlot(
        adUnitPath,
        googletag.enums.OutOfPageFormat.INTERSTITIAL
      );

      if (!interstitialSlot) return;

      slotRef.current = interstitialSlot;
      interstitialSlot.addService(googletag.pubads()).setConfig({
        interstitial: {
          triggers: {
            navBar: true,
            unhideWindow: true,
          },
        },
      });

      googletag.pubads().addEventListener("slotOnload", handleSlotOnload);

      if (!gptServicesEnabled) {
        gptServicesEnabled = true;
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
      }

      googletag.display(interstitialSlot);
    });

    return () => {
      googletag.cmd.push(() => {
        googletag.pubads().removeEventListener("slotOnload", handleSlotOnload);
        if (slotRef.current) {
          googletag.destroySlots([slotRef.current]);
          slotRef.current = null;
        }
      });
    };
  }, [adUnitPath]);

  return null;
};

export default InterstitialAd;