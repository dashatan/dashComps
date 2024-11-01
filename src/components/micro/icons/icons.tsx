import dynamic from "next/dynamic";

export const icons = {
  Alert: dynamic(async () => import("./assets/alert.svg")),
  Book: dynamic(async () => import("./assets/book.svg")),
  Calendar: dynamic(async () => import("./assets/calendar.svg")),
  Chart: dynamic(async () => import("./assets/vuesax-bulk-chart.svg")),
  Clock: dynamic(async () => import("./assets/clock.svg")),
  Dashboard: dynamic(async () => import("./assets/dashboard.svg")),
  Home: dynamic(async () => import("./assets/home.svg")),
  Link: dynamic(async () => import("./assets/link.svg")),
  Mail: dynamic(async () => import("./assets/mail.svg")),
  Monitor: dynamic(async () => import("./assets/monitor.svg")),
  More: dynamic(async () => import("./assets/more.svg")),
  Note: dynamic(async () => import("./assets/note.svg")),
  Search: dynamic(async () => import("./assets/search.svg")),
  Search2: dynamic(async () => import("./assets/search2.svg")),
  Server: dynamic(async () => import("./assets/server.svg")),
  Sirat: dynamic(async () => import("./assets/sirat.svg")),
  Sort: dynamic(async () => import("./assets/sort.svg")),
  TrendDown: dynamic(async () => import("./assets/trendDown.svg")),
  TrendUp: dynamic(async () => import("./assets/trendUp.svg")),
  User: dynamic(async () => import("./assets/user.svg")),
  Chevron: dynamic(async () => import("./assets/chevron.svg")),
  Message: dynamic(async () => import("./assets/message.svg")),
  Check: dynamic(async () => import("./assets/check.svg")),
  Plug: dynamic(async () => import("./assets/plug.svg")),
  ArrowLeft: dynamic(async () => import("./assets/arrow-left.svg")),
  Info: dynamic(async () => import("./assets/info-circle.svg")),
  Tick: dynamic(async () => import("./assets/tick.svg")),
  Plus: dynamic(async () => import("./assets/plus.svg")),
  Minus: dynamic(async () => import("./assets/vuesax-outline-minus.svg")),
  Flash: dynamic(async () => import("./assets/vuesax-bold-flash.svg")),
  Danger: dynamic(async () => import("./assets/vuesax-bold-danger.svg")),
  People: dynamic(async () => import("./assets/vuesax-bulk-people.svg")),
  ArrowUp: dynamic(async () => import("./assets/vuesax-bold-arrow-up.svg")),
  ArrowDown: dynamic(async () => import("./assets/vuesax-bold-arrow-down.svg")),
  Edit: dynamic(async () => import("./assets/vuesax-outline-edit.svg")),
  Trash: dynamic(async () => import("./assets/vuesax-outline-trash.svg")),
  ToggleOn: dynamic(async () => import("./assets/vuesax-outline-toggle-on-circle.svg")),
  ToggleOff: dynamic(async () => import("./assets/vuesax-outline-toggle-off-circle.svg")),
  NoResult: dynamic(async () => import("./assets/no-result.svg")),
  Folder: dynamic(async () => import("./assets/vuesax-outline-folder-2.svg")),
  IranPlate: dynamic(async () => import("./assets/iran-plate.svg")),
  Car: dynamic(async () => import("./assets/vuesax-bulk-car.svg")),
  Diagonal: dynamic(async () => import("./assets/diagonal.svg")),
  PersonnelCard: dynamic(async () => import("./assets/vuesax-bold-personalcard.svg")),
  Candle: dynamic(async () => import("./assets/vuesax-linear-candle-2.svg")),
  Profile: dynamic(async () => import("./assets/vuesax-bulk-profile-2.svg")),
  CarMarker: dynamic(async () => import("./assets/carMarker.svg")),
  Pattern: dynamic(async () => import("./assets/vuesax-bulk-3square.svg")),
  UserTag: dynamic(async () => import("./assets/vuesax-bulk-user-tag.svg")),
  Eye: dynamic(async () => import("./assets/vuesax-bulk-frame.svg")),
  Notification: dynamic(async () => import("./assets/vuesax-bulk-notification.svg")),
  Video: dynamic(async () => import("./assets/vuesax-linear-video.svg")),
  EyeLinear: dynamic(async () => import("./assets/vuesax-linear-eye.svg")),
  Map: dynamic(async () => import("./assets/map.svg")),
  CalendarLinear: dynamic(async () => import("./assets/vuesax-linear-calendar.svg")),
  CarLinear: dynamic(async () => import("./assets/car.svg")),
  ClockLinear: dynamic(async () => import("./assets/vuesax-linear-clock.svg")),
  ProfileLink: dynamic(async () => import("./assets/profile-link.svg")),
  LinearNote: dynamic(async () => import("./assets/vuesax-linear-note.svg")),
  LinearDocumentText: dynamic(async () => import("./assets/vuesax-linear-document-text.svg")),
  LinearRefresh: dynamic(async () => import("./assets/vuesax-linear-refresh-2.svg")),
  Location: dynamic(async () => import("./assets/location.svg")),
  LinearLocationCross: dynamic(async () => import("./assets/vuesax-linear-location-cross.svg")),
  PlateBox: dynamic(async () => import("./assets/plate-box.svg")),
};
