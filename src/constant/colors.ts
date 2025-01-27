export function getColorHex(colorName: string): string {
  switch (colorName.toLowerCase()) {
    case "white":
      return "#FFFFFF";
    case "black":
      return "#000000";
    case "red":
      return "#FF0000";
    case "green":
      return "#008000";
    case "blue":
      return "#0000FF";
    case "yellow":
      return "#FFFF00";
    case "cyan":
      return "#00FFFF";
    case "magenta":
      return "#FF00FF";
    case "silver":
      return "#C0C0C0";
    case "gray":
      return "#808080";
    case "maroon":
      return "#800000";
    case "olive":
      return "#808000";
    case "purple":
      return "#800080";
    case "teal":
      return "#008080";
    case "navy":
      return "#000080";
    case "orange":
      return "#FFA500";
    case "gold":
      return "#FFD700";
    case "pink":
      return "#FFC0CB";
    case "brown":
      return "#A52A2A";
    case "lime":
      return "#00FF00";
    case "indigo":
      return "#4B0082";
    case "coral":
      return "#FF7F50";
    case "beige":
      return "#F5F5DC";
    case "lavender":
      return "#E6E6FA";
    case "turquoise":
      return "#40E0D0";
    case "sky blue":
      return "#87CEEB";
    case "light gray":
      return "#D3D3D3";
    case "dark gray":
      return "#A9A9A9";
    case "crimson":
      return "#DC143C";
    case "aquamarine":
      return "#7FFFD4";
    case "mint green":
      return "#98FF98";
    case "peach":
      return "#FFDAB9";
    case "khaki":
      return "#F0E68C";
    case "periwinkle":
      return "#CCCCFF";
    case "chartreuse":
      return "#7FFF00";
    case "ivory":
      return "#FFFFF0";
    case "salmon":
      return "#FA8072";
    case "plum":
      return "#DDA0DD";
    case "chocolate":
      return "#D2691E";
    default:
      return "Color not found!";
  }
}

export const popularColors = [
  { key: "Red", value: "red" },
  { key: "Blue", value: "blue" },
  { key: "Black", value: "black" },
  { key: "White", value: "white" },
  { key: "Green", value: "green" },
  { key: "Yellow", value: "yellow" },
  { key: "Purple", value: "purple" },
  { key: "Orange", value: "orange" },
  { key: "Pink", value: "pink" },
  { key: "Brown", value: "brown" },
  { key: "Gray", value: "gray" },
  { key: "Beige", value: "beige" },
];

export const popularSizes = [
  { key: "Extra Small", value: "XS" },
  { key: "Small", value: "S" },
  { key: "Medium", value: "M" },
  { key: "Large", value: "L" },
  { key: "Extra Large", value: "XL" },
  { key: "2XL", value: "XXL" },
  { key: "3XL", value: "XXXL" },
];
