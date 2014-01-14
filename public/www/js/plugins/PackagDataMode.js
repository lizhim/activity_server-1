function Data(data) {
    this.data = data;
}

Data.prototype.activity_name = function () {
    var user_name = user.get_user_name()
    return _.map(this.data["activities"], function (list) {
        list["sign_up_number"] = SignUp.render_sign_ups(list["activity_name"]).length;
        list["user_name"] = user_name;
        return list
    })
}

Data.prototype.sign_up = function () {
    var user_name = user.get_user_name()
    return _.map(this.data["sign_up"], function (list) {
        list["user"] = user_name
        return list
    })
}

Data.prototype.bid_list = function () {
    var user_name = user.get_user_name()
    return _.map(this.data["bids"], function (list) {
        return {"user": user_name, "activity_name": list["activity_name"], "bid_name": list["bid_name"], "number": list["biddings"].length, "status": list["status"]}
    })
}

Data.prototype.bidding = function () {

    var a = _.map(this.data["bids"], function (list) {
        return Data.bidding_list(list)
    })
    console.log(a)
    return _.flatten(a)
}

Data.prototype.analysis = function () {

    var a = _.map(this.data["bids"], function (list) {
        return Data.analysis_list(list)
    })
    return _.flatten(a)
}


Data.prototype.result = function () {
    var user_name = user.get_user_name()
    return  _.map(this.data["bids"], function (list) {
        return {"user": user_name, "bid_name": list["bid_name"], "activity_name": list["activity_name"], "result": list["sorting"]}
    })
}

Data.get_date = function () {
    var activity_of_user = user.get_activity_of_user();
    var data = new Data(activity_of_user);
    var activity = data.activity_name()
    var sign_up = data.sign_up()
    var bidding = data.bidding()
    var bid_list = data.bid_list()
    var analysis = data.analysis()
    var result = data.result()
    return {"activity": activity, "sign_up": sign_up, "bid_list": bid_list, "bidding": bidding, "analysis": analysis, "result": result}
}

Data.bidding_list = function (bid) {
    var user_name = user.get_user_name()
    return _.map(bid["biddings"], function (list) {
        list["bid_name"] = bid["bid_name"]
        list["activity_name"] = bid["activity_name"]
        list["user"] = user_name
        return list
    })
}

Data.analysis_list = function (bid) {
    var user_name = user.get_user_name()
    return _.map(bid["analysis"], function (list) {
        list["bid_name"] = bid["bid_name"]
        list["activity_name"] = bid["activity_name"]
        list["user"] = user_name
        return list
    })
}

