import apiSlice from "../../app/apiSlice";
import { setData } from "./dataSlice";

const ChatApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    viewInChatToADMIN: build.query({
      query: () => ({
        url: "api/Conversation/Admin",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setData({ data: data }));
          }
        } catch (err) {
          console.error('Error during login:', err);
        }
      },
      providesTags: ["Conversation"],
    }),
    viewInChat: build.query({
      query: ({ page = 1, limit = 4 }) => ({
        url: `api/Conversation?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setData({ data: data }));
          }
        } catch (err) {
          console.error('Error during fetch:', err);
        }
      },
      providesTags: ["Conversation"],
    }),
    continueChatting: build.mutation({
      query: (ChatConversation) => ({
        url: "api/Conversation",
        method: "POST",
        body: ChatConversation,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setData({ data: data }));
          }
        } catch (err) {
          console.error('Error during login:', err);
        }
      },
      invalidatesTags: ["Conversation"],
    }),
    chat: build.mutation({
      query: (ChatConversation) => ({
        url: "api/Conversation",
        method: "PUT",
        body: ChatConversation,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setData({ data: data }));
          }
        } catch (err) {
          console.error('Error during login:', err);
        }
      },
      invalidatesTags: ["Conversation"],
    }),
    deleteMessage: build.mutation({
        query: ({ conversationId, messageId }) => ({
        url: "api/Conversation",
        method: "DELETE",
        body: { conversationId, messageId },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setData({ data: data }));
          }
        } catch (err) {
          console.error('Error during login:', err);
        }
      },
      invalidatesTags: ["Conversation"],
    }),
  }),
});

export const {
  useChatMutation,
  useContinueChattingMutation,
  useDeleteMessageMutation,
  useViewInChatQuery,
  useViewInChatToADMINQuery,
} = ChatApiSlice;
