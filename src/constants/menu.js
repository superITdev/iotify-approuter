const data = [{
  id: "dashboards",
  icon: "simple-icon-settings",
  label: "",
  to: "/app/dashboards",
  subs: [
    {
      icon: "",
      label: "",
      to: "/"
    }]
  },
  {
    id: "deployment",
    icon: "simple-icon-layers",
    label: "menu.deployment",
    to: "/",
    subs: [{
      id: "",
      label: "",
      to: "/",
    }]
  },
  {
    id: "protocols",
    icon: "iconsminds-folder-add--",
    label: "menu.protocols",
    to: "/app/pages",
    subs: [{
      id: "",
      label: "",
      to: "/",
    }]
  },
  {
    id: "memory",
    icon: "iconsminds-cpu",
    label: "menu.memory",
    to: "/",
    subs: [{
      id: "",
      label: "",
      to: "/",
    }]
  },
  {
    id: "control",
    icon: "iconsminds-arrow-loop",
    label: "menu.control",
    to: "/",
    subs: [{
      id: "",
      label: "",
      to: "/",
    }]
  },
  {
    id: "illustrations",
    icon: "iconsminds-record-1",
    label: "menu.illustrations",
    to: "/",
    subs: [{
      id: "",
      label: "",
      to: "/",
    }]
  },
];
export default data;
