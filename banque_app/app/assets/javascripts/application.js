// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

var Banque = {
    totalBalance: 0,
    getAccounts: function () {
        var that = this;
        $.ajax({
            url: '/',
            dataType: 'json',
            data: 'GET'
        }).done(function (data) {
            console.log(data);
            that.appendAccounts(data);
            that.updateBalance(data);
        });
    },
    appendAccounts: function (data) {
        var i,
            appendAccountsLength,
            accountElement;

        appendAccountsLength = data.length;
        for (i = 0; i < appendAccountsLength; i++) {
            accountElement = $("<p></p>");
            accountElement.attr("data-id", data[i].id);
            accountElement.html(data[i].name + " $" + data[i].balance);
            $("#accounts").append(accountElement);
        }
    },
    updateBalance: function (data) {
        var balanceLength,
            balanceElement,
            j;

        balanceLength = data.length;
        for (j = 0; j < balanceLength; j++) {
            this.totalBalance += data[j].balance;
        }

        balanceElement = $("<p></p>");
        balanceElement.html("$" + this.totalBalance);
        $("#balance").append(balanceElement);
    },
    deposit: function () {
        $("#main").hide();
    },
    addAccount: function () {
        $("#main").hide();
    },
    withdrawTransfer: function () {
        $("#main").hide();
    }
};

// window onload
$(function () {
    Banque.getAccounts();

    $("#main").on("click", "#deposit", Banque.deposit);
    $("#main").on("click", "#add-account", Banque.addAccount);
    $("#main").on("click", "#withdraw-transfer", Banque.withdrawTransfer);

});