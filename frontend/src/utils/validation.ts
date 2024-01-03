export default {
    classroomId (id : string) {
        if (id.match(/^[\d]{1,9}$/)) {
            return true;
        }

        return false
    },

    classroomName (name : string) {
        if (name.match(/^[\u0590-\u05fea-zA-Z][\u0590-\u05fea-zA-Z\s\d]*$/)) {
            return true;
        }

        return false;
    },

    classroomCapacity (seatsLeft : string) {
        if (seatsLeft.match(/^[\d]*$/)) {
            if (parseInt(seatsLeft) > 0 && parseInt(seatsLeft) < 1000) {
                return true;
            }
        }

        return false;
    },

    studentId (id : String) {
        if (id.match(/^[\d]{9}$/)) {
            return true;
        }

        return false;
    },

    studentAge (age : string) {
        if (age.match(/^[\d]*$/)) {
            if (parseInt(age) >= 8 && parseInt(age) <= 120) {
                return true;
            }
        }

        return false;
    },

    onlyLetters (string : string) {
        if (string.match(/^[a-zA-Z\u0590-\u05fe\s]+$/)) {
            return true;
        }
    
        return false;
    }
}