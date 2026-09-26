import React, { useEffect, useRef } from "react";

const AnchorAd = ({ adUnitPath, isTop = false }) => {
  const slotRef = useRef(null);

  useEffect(() => {
    window.googletag = window.googletag || { cmd: [] };
    const { googletag } = window;

    const handleSlotRenderEnded = (event) => {
      if (event.slot !== slotRef.current) return;

      const height = event.size && Array.isArray(event.size) ? event.size[1] : 0;
      const property = isTop ? "paddingTop" : "paddingBottom";

      if (event.isEmpty || !height) {
        document.body.style[property] = "";
      } else {
        document.body.style[property] = `${height}px`;
      }
    };

    googletag.cmd.push(() => {
      const format = isTop
        ? googletag.enums.OutOfPageFormat.TOP_ANCHOR
        : googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR;

      const anchorSlot = googletag.defineOutOfPageSlot(adUnitPath, format);

      if (!anchorSlot) return;

      slotRef.current = anchorSlot;
      anchorSlot.addService(googletag.pubads());

      googletag.pubads().addEventListener("slotRenderEnded", handleSlotRenderEnded);

      if (!window.__gptServicesEnabled) {
        window.__gptServicesEnabled = true;
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
      }

      googletag.display(anchorSlot);
    });

    return () => {
      const property = isTop ? "paddingTop" : "paddingBottom";
      document.body.style[property] = "";

      googletag.cmd.push(() => {
        googletag.pubads().removeEventListener("slotRenderEnded", handleSlotRenderEnded);
        if (slotRef.current) {
          googletag.destroySlots([slotRef.current]);
          slotRef.current = null;
        }
      });
    };
  }, [adUnitPath, isTop]);

  return null;
};

export default AnchorAd;