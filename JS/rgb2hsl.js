const rgb2hsl = (r,g,b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    let max = Math.max(r,g,b)
    let min = Math.min(r,g,b)
    let h,s,l = (max + min) / 2;
    if(max === min){
        h = s = 0;
    }else{
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: 
                h = (g - b) / d + ( g < b ? 6 : 0 );
                break;
            case g: 
                h = (b - r) / d + 2 ;
                break;
            case b: 
                h = (r - g) / d + 4;
                break;
        }
        h /= 6
    }
    return [h, s, l]
}

let [h, s, l] = rgb2hsl(235,96,96) // [ 0, 0.7765363128491618, 0.6490196078431372 ]
h *= 360
s = Math.round(s * 100)
l = Math.round(l * 100)
console.log(h, s, l)