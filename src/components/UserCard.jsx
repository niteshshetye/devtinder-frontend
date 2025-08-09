const UserCard = ({
  firstName = '',
  lastName = '',
  age = '',
  gender = 'male',
  bio = '',
  photoUrl = '',
  isLoading = false,
  _id: userId = '',
  handleUserConnection
}) => {
  
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          className="h-[300px] w-full object-cover"
          src={photoUrl}
          alt="Tinder User Profile pic"
        />
      </figure>
      <div className="card-body flex flex-col gap-2">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <p>{`${age}, ${gender}`}</p>
        <p>{bio}</p>
        <div className="card-actions justify-center pt-1">
          <button disabled={isLoading} onClick={() => userId && handleUserConnection('ignore', userId)} className="btn bg-gray-600">
            Ignore
          </button>
          <button
            disabled={isLoading}
            onClick={() => userId && handleUserConnection('interested', userId)}
            className="btn bg-purple-600"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCard
