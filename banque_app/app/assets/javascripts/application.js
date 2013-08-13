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
    //grabs json data from index action in accounts controller
    //adds click event for main deposit button
        var that = this;
        $.ajax({
            url: '/',
            dataType: 'json',
            type: 'GET'
        }).done(function (data) {
            console.log(data);
            console.log(data[0].id + " $" + data[0].balance);
            that.appendAccounts(data);
            that.updateBalance(data);
            $("#deposit-button").click(function () {
                that.deposit(data);
            });
        });
    },
    appendAccounts: function (data) {
    //appends data to DOM
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
    //calculates total balance and appends to DOM
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
    deposit: function (data) {
    //sends json data back to accounts controller to update database with new balance
        var depositValue,
            deposit,
            depositLength,
            k;

        if ($("#deposit-value").val() > 0) {
            depositValue = $("#deposit-value").val();
        } else {
            depositValue = 0;
        }

        deposit = {
            id: "",
            balance: ""
        };
        deposit.id = parseInt($("#account-to-deposit").val());

        depositLength = data.length;
        for(k = 0; k < depositLength; k++) {
            if (deposit.id === data[k].id) {
                deposit.balance = parseFloat(data[k].balance) + parseFloat(depositValue);
            }
        }

        if (depositValue !== null) {
            $.ajax({
                url: '/update/' + deposit.id,
                dataType: 'json',
                data: deposit,
                type: "PUT"
            }).done(function(data){
                console.log(data);
            });
        }
    },
    addAccount: function () {

    },
    withdrawTransfer: function () {

    },
    hideDeposit: function () {
    //adds class "hide" to element, css will make its visibility hidden
    //removes class "hide" from element, visibility will no longer be hidden
        $("#main").addClass("hide");
        $("#deposit").removeClass("hide");
    }
};

// window onload
$(function () {
    Banque.getAccounts();

    $("#main").on("click", "#main-deposit-button", Banque.hideDeposit);
    // $("#main").on("click", "#add-account", Banque.hide);
    // $("#main").on("click", "#withdraw-transfer", Banque.hide);

});