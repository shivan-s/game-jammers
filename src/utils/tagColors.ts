export default function getTagColor(color: string | undefined) {
  switch (color) {
    case "GREEN":
      return {
        bgColor: "bg-green-300",
        textColor: "text-green-800",
        subTagBgColor: "bg-green-200",
        subTagTextColor: "text-green-700",
      };
    case "YELLOW":
      return {
        bgColor: "bg-yellow-300",
        textColor: "text-yellow-800",
        subTagBgColor: "bg-yellow-200",
        subTagTextColor: "text-yellow-700",
      };
    default:
      return {
        bgColor: "bg-blue-300",
        textColor: "text-blue-800",
        subTagBgColor: "bg-blue-200",
        subTagTextColor: "text-blue-700",
      };
  }
}
