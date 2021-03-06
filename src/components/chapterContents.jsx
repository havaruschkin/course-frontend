import React, {useContext} from "react";
import LanguageContext from "../context/languageContext";

const ChapterContents = ({chapters, onChapterSelect}) => {
    let {language} = useContext(LanguageContext);

    return (
        <div className="text-center">
            <h4>{language.chapterContent}</h4>
            {chapters.map((chapter, index) => (
                <div className="clickable" key={index} onClick={() => onChapterSelect(chapter)}>
                    {index + 1}. {chapter.chapterName}
                </div>
            ))}
        </div>
    );
};

export default ChapterContents;