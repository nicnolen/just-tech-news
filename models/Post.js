const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create the Post model
class Post extends Model {
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      post_id: body.post_id,
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id,
        },
        attributes: [
          'id',
          'post_url',
          'title',
          'created_at',
          [
            sequelize.literal(
              '(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'
            ),
            'vote_count',
          ],
        ],
      });
    });
  }
}

// Create fields/columns for Post model
// create fields/columns for Post model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // verify that the url is a verified link
        isURL: true,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      // relationship between the post and the user
      references: {
        // reference the User model
        model: 'user',
        // reference the primary key (id column) in the User model. user_id is the foreign key
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

// Export the Post model
module.exports = Post;
