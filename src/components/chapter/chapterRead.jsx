import React from "react";
import ReactMarkdown from "react-markdown";
import CounterLike from "./counterLike";
import ActionBarChapter from "../common/actionBarChapter";

const ChapterRead = ({chapter, currentUser, compositionUser, compositionId, onDelete}) => {
    return (
        <div>
                <div key={chapter.id}>
                    <div>
                        {currentUser && currentUser.sub === compositionUser.login && (
                            <div className="text-right">
                                <ActionBarChapter
                                    compositionId={compositionId}
                                    onDelete={onDelete}
                                    chapterId={chapter.id}
                                />
                            </div>
                        )}
                        <h3 className="text-center"
                            style={{marginBottom: "20px"}}>
                            {chapter.chapterName}
                        </h3>
                        <ReactMarkdown source={chapter.text}/>
                    </div>
                    {currentUser && (
                        <CounterLike chapter={chapter}/>
                    )}
                </div>
        </div>
    );
};

export default ChapterRead;