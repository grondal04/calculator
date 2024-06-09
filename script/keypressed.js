document.addEventListener("keydown", (e) => {

    const signList = '+-*/';

    switch (e.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            numberHandle(e.key);
            break;
        case '=':
        case 'Enter':
            GetEqual();
            break;
        case '.':
        case ',':
            Commas();
            break;
        case 'c':
            Cexecute();
            break;
        case 'e':
            CE();
            break;
        case '\\':
            Inverse();
            break;
        case 'Shift':
            NegativeSwitch();
            break;
        default:
            if (signList.includes(e.key)) {
                SignHandle(e.key);
            }
            break;
    }


});
