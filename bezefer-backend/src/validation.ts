export default {
    validateClassId(id: string): boolean {
        return /^[\d]{1,9}$/.test(id);
    },

    validateClassName(name: string): boolean {
        return /^[\u0590-\u05fea-zA-Z][\u0590-\u05fea-zA-Z\s\d]*$/.test(name)
    },

    validateNumberOfSeats(numberOfSeats: number): boolean {
        return Number.isInteger(numberOfSeats) && numberOfSeats > 0 && numberOfSeats < 1000
    },

    validateStudentId(id: string): boolean {
        return /^[\d]{9}$/.test(id);
    },

    validateOnlyLetters(text: string): boolean {
        return /^[a-zA-Z\u0590-\u05fe\s]+$/.test(text)
    },

    validateAge(age: number): boolean {
        return Number.isInteger(age) && age >= 8 && age <=120
    }
};