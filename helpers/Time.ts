export function getNowWithHours(){
    const date = new Date()
   return  date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getMinutes();
}

export function getNowDate(){
    const date = new Date()
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
}
export function subtractMonths(month: number){
    const date = new Date();
    let index = date.getMonth()+1;
    let year = date.getFullYear();
    for(index; month > 0; month--){
        if(index == 0) {
            index = 12
            year--;
        }
        index--;      
    }    
    return {month: index, year: year}

}
module.exports = {
    getNowDate,
    getNowWithHours,
    subtractMonths
}