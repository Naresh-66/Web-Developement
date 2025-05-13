function uToInteger(x) {
    x = parseInt(x);
    return isNaN(x) ? 0 : x;
}

function uToFloat(x) {
    x = parseFloat(x);
    return isNaN(x) ? 0 : x;
}

function btnFind_onclick() {
    let cid = uToInteger(document.getElementById("nbrcid").value);
    let pr = uToFloat(document.getElementById("nbrpr").value);
    let cr = uToFloat(document.getElementById("nbrcr").value);
    let nr = cr - pr;

    if (nr < 0 || cr < pr) {
        alert("Invalid consume reading...");
        return;
    }

    document.getElementById("nbrnr").value = nr;
    document.getElementById("tbxrm").value = "";

    let cc = document.getElementById("cbxCC").value;

    let pu100 = 0, pu200 = 0, pu400 = 0, pua400 = 0, mc = 0, tip = 0;
    switch(cc) {
        case "Agriculture":
            [pu100, pu200, pu400, pua400, mc, tip] = [0.25, 0.5, 1.0, 2.0, 25, 2.5];
            break;
        case "Domestic":
            [pu100, pu200, pu400, pua400, mc, tip] = [1, 2, 4, 8, 50, 5];
            break;
        case "Commercial":
            [pu100, pu200, pu400, pua400, mc, tip] = [2, 4, 6, 12, 200, 7.5];
            break;
    }

    let u100 = Math.min(nr, 100);
    let u200 = Math.min(Math.max(nr - 100, 0), 100);
    let u400 = Math.min(Math.max(nr - 200, 0), 200);
    let ua400 = Math.max(nr - 400, 0);

    document.getElementById("tbxcuu100").value = u100;
    document.getElementById("tbxcuu200").value = u200;
    document.getElementById("tbxcuu400").value = u400;
    document.getElementById("tbxcua400").value = ua400;

    document.getElementById("tbxpuau100").value = pu100;
    document.getElementById("tbxpuau200").value = pu200;
    document.getElementById("tbxpuau400").value = pu400;
    document.getElementById("tbxpuaa400").value = pua400;

    let a100 = u100 * pu100;
    let a200 = u200 * pu200;
    let a400 = u400 * pu400;
    let aa400 = ua400 * pua400;

    document.getElementById("tbxcuau100").value = a100.toFixed(2);
    document.getElementById("tbxcuau200").value = a200.toFixed(2);
    document.getElementById("tbxcuau400").value = a400.toFixed(2);
    document.getElementById("tbxcuaa400").value = aa400.toFixed(2);

    let total = a100 + a200 + a400 + aa400;
    let tax = (total * tip) / 100;
    let net = total + tax + mc;

    document.getElementById("tbxtip").value = tip;
    document.getElementById("tbxtia").value = tax.toFixed(2);
    document.getElementById("tbxmc").value = mc;
    document.getElementById("tbxnpay").value = net.toFixed(2);
}
