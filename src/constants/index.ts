export enum MESSAGE_ERROR {
  LOGOUT = "Logout failed",
  STILL_LOGIN = "Still login",
  SEND_NOTIFICATION_DEVICE = "Send notification to device failed",
}

export enum MESSAGE_SUCCESS {
  LOGOUT = "Logout successfully.",
}

export enum LOCAL_STORAGE_KEY {
  ACCESS_TOKEN = "gc_access_token",
  REFRESH_TOKEN = "gc_refresh_token",
  GUEST_INFO = "gc_guest_info",
  GUEST_LOG = "gc_guest_log",
  TOKEN_DEVICE = "token_device",
  NOTI_END = "noti_end",
  WALLET_CONNECT = "walletconnect",
  MESSAGE = "message",
  SIGNATURE = "signature",
  EVENT_ROUTER = "event_router",
  MISSION_FALED = "mission_failed",
  MISSION_ENDED_AT = "mission_ended_at",
  IS_REGISTER_SUCCESS = "register_success",
  MISSION_NEWBIE_COMPLETED = "mission_newbie_completed",
  OPENED_MODAL_MISSION = "opened_modal_mission",
  IS_FROM_SOCIAL = "is_from_social",
  FCM_TOKEN = "fcm_token",
  IS_GUEST_MISSIONS = "is_guest_missions",
  IS_SPIN_FIRST_TIME = "is_spin_first_times",
  IS_COMPLETED_PLAY_GAME_3_TIMES = "is_compeleted_play_game_3_times",
  REF_CODE = "refCode",
}

export enum URL_QUERY_KEY {
  GUEST_TOKEN = "guest_token",
  REDIRECT_URI = "redirect_uri",
  CLIENT_ID = "client_id",
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
  GUEST_INFO = "guestInfo",
  TIME_STAMP = "timestamp",
  SCOPE = "scope",
  RESPONSE_TYPE = "response_type",
  RESPONSE_MODE = "response_mode",
  FINAL_REDIRECT_URI = "final_redirect_uri",
  CODE = "code",
  SESSION_STATE = "session_state",
  BINDING = "binding",
  SIGNUP = "signUp",
  LOCAL_STR = "localeStr",
  CODE_CHALLENGE = "code_challenge",
  CODE_CHALLENGE_METHOD = "code_challenge_method",
}

export enum LOCALE_CODE {
  EN = "en",
  VI = "vi",
}

export const LOCALES = ["en", "vi"];
