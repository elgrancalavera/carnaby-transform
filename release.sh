grunt configureRelease release --bump \
&& grunt default \
&& git add dist/* \
&& grunt configureRelease release --publish
