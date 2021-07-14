/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import Story from './Story';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onGetStory } from '../../../modules/GetStory';
import { onGetProfile } from '../../../modules/GetProfile';
import { onGetStoryLike } from '../../../modules/GetStorylike'
import { isStoryLiked } from '../../../modules/StoryLikes';
import { onGetViews } from '../../../modules/GetViews';
import { onGetAllProfile } from '../../../modules/GetAllProfile';
import { getStoryComments } from '../../../modules/GetStoryComments'
import { postStoryComment } from '../../../modules/PostStoryComment'
import { onGetStoryDisLike } from '../../../modules/GetStoryDislike'
import { SubStoryComment } from '../../../modules/SubCommentStory'
import { DeleteStory } from '../../../modules/DeleteStory'
const mapStateToProps = state => ({
  isBusyProfile: state.GetProfileReducer.isBusy,
  getprofileResponse: state.GetProfileReducer.response,

  isBusyStory: state.GetStoryReducer.isBusy,
  getstoryResponse: state.GetStoryReducer.response,
  

  isBusyStoryLike: state.GetStoryLikeReducer.isBusy,
  getstorylikeResponse: state.GetStoryLikeReducer.response,

  isBusyLike: state.StoryLikeReducer.isBusy,
  storylikeResponse: state.StoryLikeReducer.response,

  isBusyStoryDisLike: state.GetStoryDisLikeReducer.isBusy,
  getstorydislikeResponse: state.GetStoryDisLikeReducer.response,

  isBusyGetViews: state.GetViewsReducer.isBusy,
  getviewsResponse: state.GetViewsReducer.response,

  isBusyAllProfile: state.GetAllProfileReducer.isBusy,
  getallprofileResponse: state.GetAllProfileReducer.response,

  isBusyGetComments: state.StoryCommentReducer.isBusy,
  getcommentsResponse: state.StoryCommentReducer.response,

  isBusyPostComments: state.postStoryComment.isBusy,
  postcommentsResponse: state.postStoryComment.response,

  isBusyPostComments: state.SubStoryCommentReducer.isBusy,
  substorycommentsResponse: state.SubStoryCommentReducer.response,

  isBusyDeleteStory: state.DeleteStoryReducer.isBusy,
  deletestoryResponse: state.DeleteStoryReducer.response,

});

export default connect(
  mapStateToProps,
  dispatch => {
    return {
      onGetProfile: bindActionCreators(onGetProfile, dispatch),
      onGetStory: bindActionCreators(onGetStory, dispatch),
      onGetStoryLike: bindActionCreators(onGetStoryLike, dispatch),
      onGetStoryDisLike: bindActionCreators(onGetStoryDisLike, dispatch),
      isStoryLiked: bindActionCreators(isStoryLiked, dispatch),
      onGetViews: bindActionCreators(onGetViews, dispatch),
      onGetAllProfile: bindActionCreators(onGetAllProfile, dispatch),
      getStoryComments: bindActionCreators(getStoryComments, dispatch),
      postStoryComment: bindActionCreators(postStoryComment, dispatch),
      SubStoryComment: bindActionCreators(SubStoryComment, dispatch),
      DeleteStory: bindActionCreators(DeleteStory, dispatch),

    };
  },
)(Story);
