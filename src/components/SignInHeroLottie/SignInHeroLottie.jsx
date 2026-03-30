import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

/** Default animation from LottieFiles (dotlottie hosted URL). */
export const DEFAULT_SIGN_IN_LOTTIE_SRC =
  "https://lottie.host/5221fc84-ee03-44e1-baeb-f9aea40acee3/Hi91VyL4G5.lottie";

/**
 * Sign-in hero illustration: DotLottie animation (replaces static image panel).
 */
function SignInHeroLottie({
  src,
  loop,
  autoplay,
  sx,
  maxWidth,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
    >
      <DotLottieReact
        src={src}
        loop={loop}
        autoplay={autoplay}
        style={{
          width: "100%",
          maxWidth:
            typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
          height: "auto",
          display: "block",
        }}
      />
    </Box>
  );
}

SignInHeroLottie.propTypes = {
  src: PropTypes.string,
  loop: PropTypes.bool,
  autoplay: PropTypes.bool,
  sx: PropTypes.object,
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

SignInHeroLottie.defaultProps = {
  src: DEFAULT_SIGN_IN_LOTTIE_SRC,
  loop: true,
  autoplay: true,
  sx: undefined,
  maxWidth: 520,
};

export default SignInHeroLottie;
