export default {
    validateClassId(id: string): boolean {
        return /^[\d]{1,9}$/.test(id);
    },

    validateClassName(name: string): boolean {
        return /^[\u0590-\u05fea-zA-Z][\u0590-\u05fea-zA-Z\s\d]*$/.test(name)
    },

    validatecapacity(capacity: number): boolean {
        return Number.isInteger(capacity) && capacity > 0 && capacity < 1000
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