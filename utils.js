export const trimText = (text, limit) => text.length > limit ? `${text.slice(0,limit)}...` : text;

// 일정 이상 수의 글자가 넘어가면 처리해주는 함수이다. ~~~~~~~... 이런식으로!
// 화면에서 너무 자주 쓰여서 그냥 함수를 만들었다. 