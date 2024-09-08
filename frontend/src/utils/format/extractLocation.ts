 export function extractLocation(codename:string) {
    // Tách chuỗi tại các dấu gạch dưới và lấy phần cuối cùng
    if(codename.includes("thanh_pho_")) return  codename.split('thanh_pho_')[1].replace('_','-');
    return codename.split('tinh_')[1].replace('_','-');
 }
 