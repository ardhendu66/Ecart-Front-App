export function moneyComaSeperator(param: number) {
    var params = String(param), newParams = "";
    if(params.includes(".")) {
        var integer = params.split(".")[0];
        var floatingPoints = params.split(".")[1];
        floatingPoints.length === 1 ? floatingPoints = `${floatingPoints}0` : floatingPoints;
        switch(integer.length) {
            case 4: {
                newParams = `${integer[0]},${integer.slice(1)}`
                break;
            }
            case 5: {
                newParams = `${integer[0]}${integer[1]},${integer.slice(2)}`
                break;
            }
            case 6: {
                newParams = `${integer[0]},${integer[1]}${integer[2]},${integer.slice(3)}`
                break;
            }
            case 7: {
                newParams = `${integer[0]}${integer[1]},${integer[2]}${integer[3]},${integer.slice(4)}`
                break;
            }
            case 8: {
                newParams = `${integer[0]},${integer[1]}${integer[2]},${integer[3]}${integer[4]},${integer.slice(5)}`
                break;
            }
            default: {
                newParams = integer;
                break;
            }
        }
        newParams += `.${floatingPoints}`
    }
    else {
        switch(params.length) {
            case 4: {
                newParams = `${params[0]},${params.slice(1)}`
                break;
            }
            case 5: {
                newParams = `${params[0]}${params[1]},${params.slice(2)}`
                break;
            }
            case 6: {
                newParams = `${params[0]},${params[1]}${params[2]},${params.slice(3)}`
                break;
            }
            case 7: {
                newParams = `${params[0]}${params[1]},${params[2]}${params[3]},${params.slice(4)}`
                break;
            }
            case 8: {
                newParams = `${params[0]},${params[1]}${params[2]},${params[3]}${params[4]},${params.slice(5)}`
                break;
            }
            default: {
                newParams = params;
                break;
            }
        }
    }
    return newParams;
}

export function checkFrequency(array: string[]): number {
    const countObject: any = {};
    for (let i = 0; i < array.length; i++) {
        if(countObject[array[i]]) {
            countObject[array[i]]++;
        }
        else {
            countObject[array[i]] = 1;
        }
    }
    return Object.keys(countObject).length;
}

export function countObject(array: string[]) {
    const object: any = {};
    for (let i = 0; i < array.length; i++) {
        if(object[array[i]]) {
            object[array[i]]++;
        }
        else {
            object[array[i]] = 1;
        }
    }
    return object;
}