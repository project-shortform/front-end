import { useNavigate } from 'react-router-dom'

const ResultButton = () => {
  const navigate = useNavigate()

  return (
    <button
      className="bg-background border-gray-3 fixed right-[40px] bottom-[40px] rounded-full border p-5"
      onClick={() => {
        navigate('/result')
      }}
    >
      영상 모아보기
    </button>
  )
}
export default ResultButton
