jQuery(function()
{
    jQuery('.scroll-pane-before').jScrollPane(
            {
                showArrows: true,
                verticalArrowPositions: 'before',
                horizontalArrowPositions: 'before'
            }
    );
    jQuery('.scroll-pane-after').jScrollPane(
            {
                showArrows: true,
                verticalArrowPositions: 'after',
                horizontalArrowPositions: 'after'
            }
    );
    jQuery('.scroll-pane-os').jScrollPane(
            {
                showArrows: true,
                verticalArrowPositions: 'os',
                horizontalArrowPositions: 'os'
            }
    );
    jQuery('.scroll-pane-split').jScrollPane(
            {
                showArrows: true,
                verticalArrowPositions: 'split',
                horizontalArrowPositions: 'split'
            }
    );
});


