module.exports = function Period(period = null) {

    this.yyyymm = function () {
        const dt = new Date();
        dt.setFullYear(parts[0], parts[1] - 1, 1);
        return dt.format("YYYYMM");
    }

    this.startsWith = function (format = "DD.MM.YYYY") {
        const dt = new Date();
        dt.setFullYear(parts[0], parts[1] - 1, 1);
        return dt.format(format);
    }

    this.endsWith = function (format = "DD.MM.YYYY") {
        const dt = new Date();
        dt.setFullYear(parts[0], parts[1], 0);
        return dt.format(format);
    }

    this.lastMonths = function (num, format = "DD.MM.YYYY") {
        const dt = new Date();
        dt.setFullYear(parts[0], parts[1] - 1, 1);
        const results = [];
        for (let n = num; num !== 0; num--) {
            results.push(dt.format(format));
            dt.setMonth(dt.getMonth() - 1);
        }
        return results;
    }

    this.isDatesEqual = function (d1, d2) {
        try {
            const dt1 = new Date(d1);
            const dt2 = new Date(d2);
            return dt1.getTime() === dt2.getTime();
        } catch (error) {
            console.log(error);
        }
        return false;
    }

    this.dataTable = function () {
        const dt = new Date();
        dt.setFullYear(parts[0], parts[1], 0);
        return dt.format("telephone_data_YYYYMM");
    }

    this.rawTable = function () {
        const dt = new Date();
        dt.setFullYear(parts[0], parts[1], 0);
        return dt.format("telephone_raw_YYYYMM");
    }


    if (!period) {
        period = new Date().format('YYYY-MM-DD');
    }

    if (typeof (period) === "object") {
        period = period.format("YYYY-MM-DD");
    }
    const parts = period.split("-");
    if (parts.length !== 3) {
        throw new Error("YYYY-MM-DD date expected");
    }

}

Date.prototype.formatDBType = function () {
    return new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
};

Date.prototype.format = function (format = "DD.MM.YYYY") {
    var month = "" + (this.getMonth() + 1),
        day = "" + this.getDate(),
        year = "" + this.getFullYear();

    if (month.length < 2) month = "0" + month;

    if (day.length < 2) day = "0" + day;

    return format
        .replace("YYYY", year)
        .replace("YY", year.substring(2, 4))
        .replace("MM", month)
        .replace("DD", day);
}
