import React from "react";

const ChapterContents = ({chapters}) => {
    return (
        <div>
            <h4>Table of contents:</h4>
            <div style={{marginBottom: "20px"}}>
                {chapters.map((chapter, index) => (
                    <div key={index}>
                        {index + 1}. {chapter.chapterName}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChapterContents;