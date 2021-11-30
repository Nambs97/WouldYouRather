<select
  className="signin-form-select"
  defaultValue="none"
  onChange={handleOnChange}
>
  <option value="none" hidden disabled>
    Select User
  </option>
  {usersArray.length > 0 ? (
    usersArray.map((user) => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ))
  ) : (
    <option>Loading...</option>
  )}
</select>;
