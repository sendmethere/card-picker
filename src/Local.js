const saveStateToLocalStorage = (key, value) => {
    try {
        const valueToStore = JSON.stringify(value);
        localStorage.setItem(key, valueToStore);
    } catch (error) {
        console.error(`Error saving ${key} to localStorage`, error);
    }
};

const loadStateFromLocalStorage = (key, defaultValue) => {
    try {
        const value = localStorage.getItem(key);
        if (value === null) { // 키에 해당하는 값이 없으면 기본값 반환
        return defaultValue;
        }
        return JSON.parse(value);
    } catch (error) {
        console.error(`Error loading ${key} from localStorage`, error);
        return defaultValue; // 오류 발생 시 기본값 반환
    }
};

export { saveStateToLocalStorage, loadStateFromLocalStorage };