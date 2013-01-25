(function ($) {
  Drupal.behaviors.entityReferenceSuggestion = {
    attach: function(context) {
      // Bind click event to all suggestions
      $(".enitityreference_suggestion").click(function() {

        // Determine widget type & suggestion value
        var widget = $(this).attr('widget');
        var suggestionValue = $(this).html();
        var suggestionId = $(this).attr('nid');

        // Set value, method varies based on widget type
        switch (widget) {
          // Autocomplete widget
          case 'entityreference_autocomplete':
            var $input = $(this).siblings('.form-item').children('input');
            $input.attr('value', suggestionValue+' ('+suggestionId+')');
            break;

          // Autocomplete tags widget
          case 'entityreference_autocomplete_tags':
            var $input = $(this).siblings('.form-item').children('input');
            if ($input.attr('value') == '')
              $input.attr('value', suggestionValue+' ('+suggestionId+')');
            else
              $input.attr('value', $input.attr('value') + ', '+suggestionValue);
            break;

          // Radio/Checkboxes widget
          case 'options_buttons':
            var $formItem = $(this).siblings('.form-item');
            $formItem.find('input[value='+suggestionId+']').attr('checked', function(idx, oldAttr){return !oldAttr;});
            break;

          // Select widget
          case 'options_select':
            var $select = $(this).siblings('.form-item').children('select');
            // Single value select
            if (!$select.attr('multiple')) {
              $select.val(suggestionId);
            }
            // Multiple value select
            else {
              $select.find('option[value='+suggestionId+']').attr('selected', function(idx, oldAttr){return !oldAttr;});;
            }
            break;
        }
      });
    }
  };
})(jQuery);