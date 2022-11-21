import { Download, Fullscreen } from "@mui/icons-material";
import { Box, IconButton, Modal } from "@mui/material";
import * as d3 from "d3";
import React, { useCallback, useEffect, useRef, useState } from "react";
import saveSvgAsPng from "save-svg-as-png";

const D3Wrapper = (props) => {
  const { width, height, renderer, data } = props;

  const [showButtons, setShowButtons] = useState(false);
  const [open, setOpen] = useState(false);

  const svgElementRef = useRef(null);

  useEffect(() => {
    if (svgElementRef.current) {
      const svg = d3.select(svgElementRef.current);
      renderer(svg, data, width, height, d3);
    }
  }, [data, renderer, svgElementRef, width, height]);

  const svgElementRefModal = useCallback(
    (node) => {
      const svg = d3.select(node);
      renderer(svg, data, width * 2, height * 2, d3);
    },
    [data, width, height, renderer]
  );

  const download = () => {
    if (svgElementRef.current) {
      saveSvgAsPng.saveSvgAsPng(svgElementRef.current, "plot.png");
    }
  };

  return (
    <div
      style={{ position: "relative", width, height }}
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      {showButtons ? (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            backgroundColor: "lightblue",
          }}
        >
          <IconButton
            onClick={() => {
              setOpen(true);
            }}
          >
            <Fullscreen />
          </IconButton>
          <IconButton onClick={download}>
            <Download />
          </IconButton>
        </div>
      ) : (
        ""
      )}
      <svg
        width={width}
        height={height}
        ref={svgElementRef}
        xmlns="http://www.w3.org/2000/svg"
      />
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <svg
            width={width * 2}
            height={height * 2}
            ref={svgElementRefModal}
            xmlns="http://www.w3.org/2000/svg"
          />
        </Box>
      </Modal>
    </div>
  );
};

export default D3Wrapper;
