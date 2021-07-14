/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import Story from './OtherStory';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onGetAllStory } from '../../../modules/GetAllStory';
import { onGetStoryLike } from '../../../modules/GetStorylike'
import { onGetProfile } from '../../../modules/GetProfile';
import { onGetOtherStory } from '../../../modules/GetOtherStory';
import { isStoryLiked } from '../../../modules/StoryLikes';
import { onGetAllProfile } from '../../../modules/GetAllProfile';
import { onGetStoryDisLike } from '../../../modules/GetStoryDislike'
import { isViewed } from '../../../modules/VIews'
import { onGetViews } from '../../../modules/GetViews';
import { getStoryComments } from '../../../modules/GetStoryComments'
import { postStoryComment } from '../../../modules/PostStoryComment'
import { SubStoryComment } from '../../../modules/SubCommentStory'

const mapStateToProps = state => ({

  isBusyProfile: state.GetProfileReducer.isBusy,
  getprofileResponse: state.GetProfileReducer.response,

  isBusyallStory: state.GetAllStoryReducer.isBusy,
  getallstoryResponse: state.GetAllStoryReducer.response,

  isBusyotherStory: state.GetOtherStoryReducer.isBusy,
  getotherstoryResponse: state.GetOtherStoryReducer.response,

  isBusyLike: state.StoryLikeReducer.isBusy,
  storylikeResponse: state.StoryLikeReducer.response,

  isBusyViews: state.StoryViewReducer.isBusy,
  viewsResponse: state.StoryViewReducer.response,

  isBusyAllProfile: state.GetAllProfileReducer.isBusy,
  getallprofileResponse: state.GetAllProfileReducer.response,

  isBusyStoryLike: state.GetStoryLikeReducer.isBusy,
  getstorylikeResponse: state.GetStoryLikeReducer.response,

  isBusyStoryDisLike: state.GetStoryDisLikeReducer.isBusy,
  getstorydislikeResponse: state.GetStoryDisLikeReducer.response,

  isBusyGetViews: state.GetViewsReducer.isBusy,
  getviewsResponse: state.GetViewsReducer.response,

  isBusyGetComments: state.StoryCommentReducer.isBusy,
  getcommentsResponse: state.StoryCommentReducer.response,

  isBusyPostComments: state.postStoryComment.isBusy,
  postcommentsResponse: state.postStoryComment.response,

  isBusyPostComments: state.SubStoryCommentReducer.isBusy,
  substorycommentsResponse: state.SubStoryCommentReducer.response,

});

export default connect(
  mapStateToProps,
  dispatch => {
    return {
      onGetProfile: bindActionCreators(onGetProfile, dispatch),
      onGetAllStory: bindActionCreators(onGetAllStory, dispatch),
      onGetOtherStory: bindActionCreators(onGetOtherStory, dispatch),
      isStoryLiked: bindActionCreators(isStoryLiked, dispatch),
      isViewed: bindActionCreators(isViewed, dispatch),
      onGetAllProfile: bindActionCreators(onGetAllProfile, dispatch),
      onGetStoryLike: bindActionCreators(onGetStoryLike, dispatch),
      onGetStoryDisLike: bindActionCreators(onGetStoryDisLike, dispatch),
      onGetViews: bindActionCreators(onGetViews, dispatch),
      getStoryComments: bindActionCreators(getStoryComments, dispatch),
      postStoryComment: bindActionCreators(postStoryComment, dispatch),
      SubStoryComment: bindActionCreators(SubStoryComment, dispatch),

    };
  },
)(Story);







