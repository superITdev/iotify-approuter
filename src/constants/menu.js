const data = [{
  id: "dashboards",
  icon: "simple-icon-settings",
  label: "",
  thumb: '/assets/img/menu/dashbord.png',
  activeThumb: '/assets/img/menu/dashbord-active.png',
  dragImg: '',
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
    activeThumb: '/assets/img/menu/deploy-active.png',
    dragImg: '',
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
    activeThumb: '/assets/img/menu/protocols-active.png',
    dragImg: '/assets/img/work/group1.png',
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
    activeThumb: '/assets/img/menu/memory-active.png',
    dragImg: '/assets/img/work/group2.png',
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
    activeThumb: '/assets/img/menu/control-active.png',
    dragImg: '/assets/img/work/group3.png',
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
    activeThumb: '/assets/img/menu/illustrations-active.png',
    dragImg: '/assets/img/work/group4.png',
    to: "/",
    subs: [{
      id: "",
      label: "",
      to: "/",
    }]
  },
];
export default data;
