const data = [{
  id: "dashboards",
  icon: "simple-icon-settings",
  label: "",
  thumb: '/assets/img/menu/dashbord.png',
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
    thumb: '/assets/img/menu/deploy.png',
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
    thumb: '/assets/img/menu/protocols.png',
    to: "/",
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
    thumb: '/assets/img/menu/memory.png',
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
    thumb: '/assets/img/menu/control.png',
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
    thumb: '/assets/img/menu/illustrations.png',
    to: "/",
    subs: [{
      id: "",
      label: "",
      to: "/",
    }]
  },
];
export default data;
