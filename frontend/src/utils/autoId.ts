export const autoId = (value) => {
  let code =
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      ?.replaceAll(" ", "") + "ffhdfh";
  let newCode = "";
  let index = code?.length;
  for (let i = 0; i < 9; i++) {
    newCode += code[Math.floor(index / 2)];
    index /= 2;
  }
  return newCode.toUpperCase();
};
