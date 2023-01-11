import commentsStyles from "../styles/Comments.module.css"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Comments = ({gymId}) => {
    const { user } = useContext(AuthContext)

    const [comments, setComments] = useState([])
    const [count, setCount] = useState(0)

    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!message){
            return
        }
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({message, gymId})
        })

        const json = await response.json()

        if(response.ok) {
            const comment = json.comment
            setComments([comment, ...comments])
            setMessage('')
            setCount((count) => count + 1)
        }
    }

    useEffect(() => {
        console.log('comments useEffect called')
        const fetchComments = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/comments/'+gymId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json()
            
            if(response.ok) {
                setCount(json.count)
                setComments(json.comments)
            }
        }
        fetchComments()
    },[gymId])

    const formatDate = (date) => {
        const formatOptions = {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'}
        const formatedDate = (new Date(date).toLocaleDateString("sk-SK", formatOptions))
        return formatedDate
    }

    return ( 
        <div className={commentsStyles['comments-section']}>
            <h2>Komentáre '{count}'</h2>
            {!user &&
            <span>Pre pridávanie komentárov musíte byť prihlásený</span>}
            {user && (
            <form action="" onSubmit={handleSubmit}>
                <textarea className={commentsStyles['new-comment']} rows="3" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                <button className={commentsStyles['submit-comment']}>Odoslať</button>
            </form>
            )}
            {comments && (
            <div className={commentsStyles['comments-wrapper']}>
                {comments.map((comment) => (
                    <div className={commentsStyles['comment']} key={comment._id}>
                        <span className={commentsStyles['avatar']}>
                            <i className="fa-regular fa-circle-user"></i>
                        </span>
                        <span className={commentsStyles['message']}>
                            <span className={commentsStyles['message-header']}>
                                <h2 className={commentsStyles['username']}>{comment.username}</h2>
                                <span className={commentsStyles['message-date']}>{formatDate(comment.createdAt)}</span>
                            </span>
                            <span className={commentsStyles['message-body']}>
                                <p>{comment.message}</p>
                            </span>
                        </span>
                    </div>
                ))}
            </div>
            )}
        </div>
     );
}
 
export default Comments;