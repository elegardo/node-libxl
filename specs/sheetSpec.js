var xl = require('../lib/libxl');

describe('The sheet class', function() {

    var book = new xl.Book(xl.BOOK_TYPE_XLSX),
        sheet = book.addSheet('foo'),
        format = book.addFormat(),
        wrongBook = new xl.Book(xl.BOOK_TYPE_XLS),
        wrongSheet = wrongBook.addSheet('bar'),
        wrongFormat = wrongBook.addFormat(),
        row = 1;

    it('sheet.cellType determines cell type', function() {
        sheet
            .writeStr(row, 0, 'foo')
            .writeNum(row, 1, 10);

        expect(function() {sheet.cellType();}).toThrow();
        expect(function() {sheet.cellType.call({}, row, 0);}).toThrow();

        expect(sheet.cellType(row, 0)).toBe(xl.CELLTYPE_STRING);
        expect(sheet.cellType(row, 1)).toBe(xl.CELLTYPE_NUMBER);

        row++;
    });

    it('sheet.isFormula checks whether a cell contains a formula', function() {
        sheet
            .writeStr(row, 0, 'foo')
            .writeFormula(row, 1, '=1');

        expect(function() {sheet.isFormula();}).toThrow();
        expect(function() {sheet.isFormula.call({}, row, 0)}).toThrow();

        expect(sheet.isFormula(row, 0)).toBe(false);
        expect(sheet.isFormula(row, 1)).toBe(true);

        row++;
    });

    it ('sheet.cellFormat retrieves the cell format', function() {
        expect(function() {sheet.cellFormat();}).toThrow();
        expect(function() {sheet.cellFormat.call({}, row, 0);}).toThrow();

        var cellFormat = sheet.cellFormat(row, 0);
        expect(format instanceof format.constructor).toBe(true);
    });

    it('sheet.setCellFormat sets the cell format', function() {
        expect(function() {sheet.setCellFormat();}).toThrow();
        expect(function() {sheet.setCellFormat.call({}, row, 0, format);}).toThrow();

        expect(function() {sheet.setCellFormat(row, 0, wrongFormat);}).toThrow();
        expect(sheet.setCellFormat(row, 0, format)).toBe(sheet);
    });

    it('sheet.readStr reads a string', function() {
        sheet.writeStr(row, 0, 'foo');
        sheet.writeNum(row, 1, 10);

        expect(function() {sheet.readStr();}).toThrow();
        expect(function() {sheet.readStr.call({}, row, 0);}).toThrow();

        var formatRef = {};
        expect(function() {sheet.readStr(row, 1);}).toThrow();
        expect(sheet.readStr(row, 0)).toBe('foo');
        expect(sheet.readStr(row, 0, formatRef)).toBe('foo');
        expect(formatRef.format instanceof format.constructor).toBe(true);

        row++;
    });

    it('sheet.writeStr writes a string', function() {
        expect(function() {sheet.writeStr();}).toThrow();
        expect(function() {sheet.writeStr.call({}, row, 0, 'foo');}).toThrow();

        expect(function() {sheet.writeStr(row, 0, 'foo', wrongFormat);}).toThrow();
        expect(sheet.writeStr(row, 0, 'foo')).toBe(sheet);
        expect(sheet.writeStr(row, 0, 'foo', format)).toBe(sheet);

        row++;
    });

    it('sheet.readNum reads a number', function() {
        sheet.writeNum(row, 0, 10);

        expect(function() {sheet.readNum();}).toThrow();
        expect(function() {sheet.readNum.call({}, row, 0);}).toThrow();

        var formatRef = {};
        expect(sheet.readNum(row, 0)).toEqual(10);
        expect(sheet.readNum(row, 0, formatRef)).toEqual(10);
        expect(formatRef.format instanceof format.constructor).toBe(true);

        row++;
    });

    it('sheet.writeNum writes a Number', function() {
        expect(function() {sheet.writeNum();}).toThrow();
        expect(function() {sheet.writeNum.call({}, row, 0, 10);}).toThrow();

        expect(function() {sheet.writeNum(row, 0, 10, wrongFormat);}).toThrow();
        expect(sheet.writeNum(row, 0, 10)).toBe(sheet);
        expect(sheet.writeNum(row, 0, 10, format)).toBe(sheet);

        row++;
    });

    it('sheet.readBool reads a bool', function() {
        sheet.writeBool(row, 0, true);

        expect(function() {sheet.readBool();}).toThrow();
        expect(function() {sheet.readBool.call({}, row, true);}).toThrow();

        var formatRef = {};
        expect(sheet.readBool(row, 0)).toEqual(true);
        expect(sheet.readBool(row, 0, formatRef)).toEqual(true);
        expect(formatRef.format instanceof format.constructor).toBe(true);

        row++;
    });

    it('sheet.writeBool writes a bool', function() {
        expect(function() {sheet.writeBool();}).toThrow();
        expect(function() {sheet.writeBool.call({}, row, 0, true);}).toThrow();

        expect(function() {sheet.writeBool(row, 0, true, wrongFormat);}).toThrow();
        expect(sheet.writeBool(row, 0, true)).toBe(sheet);
        expect(sheet.writeBool(row, 0, true, format)).toBe(sheet);

        row++;
    });

});
