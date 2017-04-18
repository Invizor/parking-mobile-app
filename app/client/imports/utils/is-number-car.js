
export default function isNumberCar(number){
  if((number.length >=8 && number.length <=9)  && (number[0]>='А' && number[0]<='Я') && (number[1]>=0 && number[1]<=9)
    && (number[2]>=0 && number[2]<=9) && (number[3]>=0 && number[3]<=9)
    && (number[4]>='А' && number[4]<='Я') && (number[5]>='А' && number[5]<='Я')
    && (number[6]>='0' && number[6]<='9') && (number[7]>='0' && number[7]<='9')){
    if(number.length == 9){
      if((number[8]>='0' && number[8]<='9')) return true;
      else return false;
    }else return true;
  } else {
    return false;
  }
}
