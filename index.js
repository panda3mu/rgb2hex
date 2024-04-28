'use strict';
// Business logic for base64 encoder (index.html).


// This state variable lets us change the conversion type without overwriting the user's last input.
var rgbToHexcode = true;
window.addEventListener('DOMContentLoaded', function () {
    rgbR.addEventListener('input', function () {
        rgbToHexcode = true;
        updateConversion();
    });
    rgbG.addEventListener('input', function () {
        rgbToHexcode = true;
        updateConversion();
    });
    rgbB.addEventListener('input', function () {
        rgbToHexcode = true;
        updateConversion();
    });
    rgbHex.addEventListener('input', function () {
        rgbToHexcode = false;
        updateConversion();
    });


    $("#colorList li").click(function () {
        var color = $(this).css("background-color");
        color = color.replace("rgb(", "");
        color = color.replace(")", "");
        var tmp = color.split(",");
        rgbR.value = tmp[0];
        rgbG.value = tmp[1];
        rgbB.value = tmp[2];
        rgbToHexcode = true;
        updateConversion();
    });

});

function updateConversion() {
    // Cleanup any leftover errors.
    try {
        bg.classList.remove('bg-color');
        bg.style.cssText = "";
        rgbTips.innerHTML = "RGB颜色值";
        hexTips.innerHTML = "十六进制颜色码";
        if (rgbToHexcode) {
            const r = rgbR.value;
            const g = rgbG.value;
            const b = rgbB.value;
            if (r != '' && g != '' && b != '') {
                var hexcode = "#";
                rgbHex.value = "";
                if (parseInt(r) != r || parseInt(g) != g || parseInt(b) != b) {
                    const errSpan = document.createElement('span');
                    errSpan.className = 'error';
                    errSpan.textContent = '请输入数字!';
                    rgbTips.appendChild(errSpan);
                    return;
                }
                if (r > 255 || g > 255 || b > 255) {
                    const errSpan = document.createElement('span');
                    errSpan.className = 'error';
                    errSpan.textContent = '数字在0-255之间!';
                    rgbTips.appendChild(errSpan);
                    return;
                }

                hexcode += getHexcode(r);
                hexcode += getHexcode(g);
                hexcode += getHexcode(b);
                rgbHex.value = hexcode;

                showResult();
            }
        } else {
            var a = rgbHex.value;
            const hexCode = a;
            if (a != "") {
                rgbR.value = "";
                rgbG.value = "";
                rgbB.value = "";

                if (a.substr(0, 1) == "#") a = a.substring(1);
                var len = a.length;
                if (len != 6 && len != 3) {
                    const errSpan = document.createElement('span');
                    errSpan.className = 'error';
                    errSpan.textContent = '十六进制颜色码为六位或三位!';
                    hexTips.appendChild(errSpan);
                    return;
                } else if (/[^0-9a-f]/i.test(a)) {
                    const errSpan = document.createElement('span');
                    errSpan.className = 'error';
                    errSpan.textContent = '请输入正确的十六进制颜色码!';
                    hexTips.appendChild(errSpan);
                    return;
                }

                a = a.toLowerCase();
                var b = new Array();
                for (var x = 0; x < 3; x++) {
                    b[0] = len == 6 ? a.substr(x * 2, 2) : a.substr(x * 1, 1) + a.substr(x * 1, 1);
                    b[3] = "0123456789abcdef";
                    b[1] = b[0].substr(0, 1);
                    b[2] = b[0].substr(1, 1);
                    b[20 + x] = b[3].indexOf(b[1]) * 16 + b[3].indexOf(b[2])
                }

                rgbR.value = b[20];
                rgbG.value = b[21];
                rgbB.value = b[22];
                showResult();
            }
        }

    } catch (e) {
        const errSpan = document.createElement('span');
        errSpan.className = 'error';
        errSpan.textContent = e.message;
        if (rgbToHexcode) {
            rgbTips.appendChild(errSpan);
        } else {
            hexTips.appendChild(errSpan);
        }
    }
}

function getHexcode(n) {
    var c = "0123456789ABCDEF", b = "", a = n % 16;
    b = c.substr(a, 1);
    a = (n - a) / 16;
    return c.substr(a, 1) + b;

}
function showResult() {
    resRgb.innerHTML = rgbR.value + "," + rgbG.value + "," + rgbB.value;
    resHex.innerHTML = rgbHex.value;
    const hexCode = rgbHex.value;
    bg.classList.add('bg-color');
    bg.style.cssText = 'background-color: ' + hexCode + ';box-shadow: 4px 4px 4px 4px ' + hexCode + ';';
    if(rgbR.value>=230||rgbG.value>=230){
        bg.classList.remove('bg-color');
    }

}
















