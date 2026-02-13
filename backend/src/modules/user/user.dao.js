import User from "../auth/user.model.js";

const getById = async (id) => {
    return await User.findById(id).select("-password");
}

export default {
    getById
}