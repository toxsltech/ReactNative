/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import AuthReducer from '../modules/Auth';
import RegisterReducer from '../modules/Register';
import VerifyOTPReducer from '../modules/VerifyOTP';
import GetProfileReducer from '../modules/GetProfile';
import GetAllProfileReducer from '../modules/GetAllProfile';
import UpdateProfileReducer from '../modules/UpdateProfile';
import ForgotPassReducer from '../modules/ForgotPass';
import AddStoryReducer from '../modules/AddStory';
import AddPostsReducer from '../modules/AddPosts';
import GetPostsReducer from '../modules/GetPosts';
import GetFeedsReducer from '../modules/GetFeeds';
import ReportPostReducer from '../modules/ReportPost';
import FollowReducer from '../modules/Follow';
import GetCommentsReducer from '../modules/GetComments';
import LikeReducer from '../modules/Like';
import UndoLikeReducer from '../modules/UndoLike';
import GetLikesReducer from '../modules/GetLikes';
import BlockUserReducer from '../modules/BlockUser';
import GetStoryReducer from '../modules/GetStory';
import GetAllStoryReducer from '../modules/GetAllStory'
import GetCategoryReducer from '../ecommerceModules/GetCategory'
import GetOtherStoryReducer from '../modules/GetOtherStory'
import GetStoryLikeReducer from '../modules/GetStorylike'
import StoryLikeReducer from '../modules/StoryLikes'
import GetViewsReducer from '../modules/GetViews'
import GetStoryDisLikeReducer from '../modules/GetStoryDislike'
import CommentReducer from '../modules/Comment';
import SubCommentReducer from '../modules/SubComment';
import VideoReducer from '../modules/Addvideoview'
import StoryViewReducer from '../modules/VIews'
import { persistReducer, persistStore } from 'redux-persist';
import StoryCommentReducer from '../modules/GetStoryComments'
import postStoryComment from '../modules/PostStoryComment'
import UnFollowReducer from '../modules/UnFollow'
import LikeCommentReducer from '../modules/LikeComment'
import LikeSubCommentReducer from '../modules/LikeSubComment'
import LikeStoryCommentReducer from '../modules/LikeStoryComment'
import GetFollowingReducer from '../modules/Following'
import SubStoryCommentReducer from '../modules/SubCommentStory'
import SellerReducer from '../modules/Addsellerprofile'
import GetFollowersReducer from '../modules/FollowersPosts'
import GetFollowersListReducer from '../modules/FollowersList'
import RemoveFollowerReducer from '../modules/RemoveFollowers'
import DeleteStoryReducer from '../modules/DeleteStory'
import UsersReducer from '../modules/UserList'
import DeletePostReducer from '../modules/Deletepost'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import middleware from './middleware';

//ecommerce

import AddwishlistReducer from '../ecommerceModules/Addwishlist';
import DeletewishlistReducer from '../ecommerceModules/Deletewishlist';
import GetwishlistReducer from '../ecommerceModules/Getwishlist';
import GetFullCategoryReducer from '../ecommerceModules/Fullcategory';
import GetSingleproductReducer from '../ecommerceModules/Singleproduct';
import GetSearchproductReducer from '../ecommerceModules/Searchproduct';
import GetBannerReducer from '../ecommerceModules/GetBanner'
import AddReviewReducer from '../ecommerceModules/AddReview'
import onGetReviewReducer from '../ecommerceModules/GetReview '
import AddToCartReducer from '../ecommerceModules/AddToCart'
import GetCartReducer from '../ecommerceModules/GetCart'
import GetUserProductReducer from '../ecommerceModules/GetUserProduct'
import AddToProductReducer from '../ecommerceModules/AddProduct'
import EditToCartReducer from '../ecommerceModules/EditToCart'
import AddToProductOnlineReducer from '../ecommerceModules/AddProductOnline'
import GetStoreReducer from '../ecommerceModules/GetStore'
import GetAddressReducer from '../ecommerceModules/GetAddress'
import AddReturnReducer from '../ecommerceModules/AddReturnRequest';
import ContactReducer from '../modules/Contactus';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'AuthReducer',
    'RegisterReducer',
    'VerifyOTPReducer',
    'GetProfileReducer',
    'UpdateProfileReducer',
    'ForgotPassReducer',
    'AddStoryReducer',
    'GetPostsReducer',
    'GetFeedsReducer',
    'ReportPostReducer',
    'FollowReducer',
    'GetCommentsReducer',
    'GetStoryReducer',
    'LikeReducer',
    'UndoLikeReducer',
    'GetLikesReducer',
    'BlockUserReducer',
    'GetAllStoryReducer',
    'AddPostsReducer',
    'GetCategoryReducer',
    'GetOtherStoryReducer',
    'GetStoryLikeReducer',
    'StoryLikeReducer',
    'GetViewsReducer',
    'CommentReducer',
    'GetAllProfileReducer',
    'GetStoryDisLikeReducer',
    'StoryViewReducer',
    'StoryCommentReducer',
    'postStoryComment',
    'UnFollowReducer',
    'SubCommentReducer',
    'LikeCommentReducer',
    'LikeSubCommentReducer',
    'SubStoryCommentReducer',
    'LikeStoryCommentReducer',
    'GetFollowingReducer',
    'SellerReducer',
    'GetFollowersReducer',
    'GetFollowersListReducer',
    'VideoReducer',
    'RemoveFollowerReducer',
    'DeleteStoryReducer',
    'UsersReducer',
    'DeletePostReducer',
    'AddwishlistReducer',
    'DeletewishlistReducer',
    'GetwishlistReducer',
    'GetFullCategoryReducer',
    'GetSingleproductReducer',
    'GetSearchproductReducer',
    'GetBannerReducer',
    'AddReviewReducer',
    'onGetReviewReducer',
    'AddToCartReducer',
    'GetCartReducer',
    'GetUserProductReducer',
    'AddToProductReducer',
    'EditToCartReducer',
    'AddToProductOnlineReducer',
    'GetStoreReducer',
    'GetAddressReducer',
    'AddReturnReducer',
    'ContactReducer'
  ],
};
const rootReducer = combineReducers({
  AuthReducer,
  RegisterReducer,
  VerifyOTPReducer,
  GetProfileReducer,
  UpdateProfileReducer,
  ForgotPassReducer,
  AddStoryReducer,
  GetPostsReducer,
  GetFeedsReducer,
  ReportPostReducer,
  FollowReducer,
  GetCommentsReducer,
  GetStoryReducer,
  LikeReducer,
  UndoLikeReducer,
  GetLikesReducer,
  BlockUserReducer,
  GetAllStoryReducer,
  AddPostsReducer,
  GetCategoryReducer,
  GetOtherStoryReducer,
  GetStoryLikeReducer,
  StoryLikeReducer,
  GetViewsReducer,
  CommentReducer,
  GetAllProfileReducer,
  GetStoryDisLikeReducer,
  StoryViewReducer,
  StoryCommentReducer,
  postStoryComment,
  UnFollowReducer,
  SubCommentReducer,
  LikeCommentReducer,
  LikeSubCommentReducer,
  SubStoryCommentReducer,
  LikeStoryCommentReducer,
  GetFollowingReducer,
  SellerReducer,
  GetFollowersReducer,
  GetFollowersListReducer,
  VideoReducer,
  RemoveFollowerReducer,
  DeleteStoryReducer,
  UsersReducer,
  DeletePostReducer,
  AddwishlistReducer,
  DeletewishlistReducer,
  GetwishlistReducer,
  GetFullCategoryReducer,
  GetSingleproductReducer,
  GetSearchproductReducer,
  GetBannerReducer,
  AddReviewReducer,
  onGetReviewReducer,
  AddToCartReducer,
  GetCartReducer,
  GetUserProductReducer,
  AddToProductReducer,
  EditToCartReducer,
  AddToProductOnlineReducer,
  GetStoreReducer,
  GetAddressReducer,
  AddReturnReducer,
  ContactReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(...middleware));
  let persistor = persistStore(store);
  return { store, persistor };
};
