export const lightTheme: ThemeAvailableColors = {
  hamburguer: {
    open: "#333",
    close: "rgba(219, 49, 49, 1)",
  },
  scrollbar: "rgba(0,0,0,.1)",
  body: {
    bg: "#f5f5f5",
    text: "#333",
    title: "#333",
  },
  header: {
    bg: "#f5f5f5",
    text: "#333",
    title: "#333",
    textOnHover: "rgba(0,0,0,.3)",
    textOnActive: "rgba(110, 4, 248, 0.45)",
  },
};

export const darkTheme: ThemeAvailableColors = {
  hamburguer: {
    open: "white",
    close: "rgba(219, 49, 49, 1)",
  },
  scrollbar: "rgba(255,255,255,.1)",
  body: {
    bg: "#333",
    text: "#f5f5f5",
    title: "#f5f5f5",
  },
  header: {
    bg: "#333",
    text: "#f5f5f5",
    title: "#f5f5f5",
    textOnHover: "rgba(255,255,255,.3)",
    textOnActive: "rgba(142, 181, 233, 0.45)",
  },
};

export type ThemeAvailableColors = {
  scrollbar: string;
  hamburguer: {
    open: string;
    close: string;
  };
  body: {
    bg: string;
    text: string;
    title: string;
  };
  header: {
    bg: string;
    text: string;
    title: string;
    textOnHover: string;
    textOnActive: string;
  };
};
