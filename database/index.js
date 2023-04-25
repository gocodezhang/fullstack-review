const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_id: {type: Number, unique: true},
  repo_name: String,
  description: String,
  repo_url: String,
  forks_count: Number,
  owner_id: Number,
  owner_name: String,
  create_at: String,
  status: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  const repoArr = repos.map((repo) => {
    const obj = {
      repo_id: repo.id,
      repo_name: repo.name,
      description: repo.description,
      repo_url: repo.html_url,
      forks_count: repo.forks_count,
      owner_id: repo.owner.id,
      owner_name: repo.owner.login,
      create_at: Date(),
      status: 'imported'
    }
    return obj;
  })

  return Repo.updateMany({}, {'status': 'updated'}).exec()
    .then(() => {
      Repo.create(repoArr)
      .then(() => {console.log('successfully saved in DB')})
      .catch((err) => {console.log(err)});
    })
    .catch(() => {console.log('Error when update status in DB')})
}

let query = () => {
  // TODO: Your code here
  // This function should return repos in the MongoDB
  return Repo.find({}).sort({'create_at': -1 ,'forks_count': -1}).limit(25).exec();
}

module.exports.save = save;
module.exports.query = query;