function init(Survey, $) {
  $ = $ || window.$;
  var widget = {
    name: "constantsum",
    title: "Constant Sum",
    iconName: "icon-constantsum",
    widgetIsLoaded: function() {
      return !!$.fn.constantsum;
    },
    defaultJSON: { choices: ["Item 1", "Item 2", "Item 3"] },
    isFit: function(question) {
      return question.getType() === "constantsum";
    },
    isDefaultRender: true,
//    htmlTemplate: "<div>test!</div>",
    activatedByChanged: function(activatedBy) {
      Survey.JsonObject.metaData.addClass(
        "constantsum",
        [
          { name: "hasOther", visible: false },
          { name: "otherText", visible: false },
          { name: "optionsCaption", visible: false },
          { name: "otherErrorText", visible: false },
          { name: "storeOthersAsComment", visible: false },
          { name: "renderAs", visible: false }
        ],
        null,
        "dropdown"
      );
      /*
      Survey.JsonObject.metaData.addProperty("constantsum", {
        name: "showValues:boolean",
        default: false
      });
      Survey.JsonObject.metaData.addProperty("constantsum", {
        name: "ratingTheme",
        default: "fontawesome-stars",
        choices: [
          "fontawesome-stars",
          "css-stars",
          "bars-pill",
          "bars-1to10",
          "bars-movie",
          "bars-square",
          "bars-reversed",
          "bars-horizontal",
          "bootstrap-stars",
          "fontawesome-stars-o"
        ]
      });
      */
    },
    afterRender: function(question, el) {
      var $el = $(el).is("select") ? $(el) : $(el).find("select");
      $el.constantsum("show", {
        //theme: question.ratingTheme,
        //initialRating: question.value,
        showValues: false,
        showSelectedRating: false,
        onSelect: function(value, text) {
          question.value = value;
        }
      });
      question.valueChangedCallback = function() {
        $(el)
          .find("select")
          .constantsum("set", question.value);
      };
    },
    willUnmount: function(question, el) {
      var $el = $(el).find("select");
      $el.constantsum("destroy");
    }
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");
}

if (typeof Survey !== "undefined") {
  init(Survey, window.$);
}

export default init;